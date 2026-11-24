import { getStoredUtmParams } from '@/lib/utm-params';

export interface LeadInput {
  name?: string;
  phone?: string;
  email: string;
  zipCode?: string;
  service: string;
  message?: string;
  source: string;
}

const sheetEndpoint = 'https://script.google.com/macros/s/AKfycbx-qf_oc0ftJqcPvfZSsYhnm37vu89MDHKtKw2TdATRRGNrG8mXboPol4sWXV9JDBKigQ/exec';
const attempts = new WeakMap<HTMLFormElement, {
  fingerprint: string;
  id: string;
  crmSaved: boolean;
  sheetSaved: boolean;
  backupStarted: boolean;
  inFlight?: Promise<void>;
}>();

export async function submitWebsiteLead(form: HTMLFormElement, lead: LeadInput): Promise<void> {
  const fields = { ...lead, ...getStoredUtmParams() };
  const fingerprint = JSON.stringify(fields);
  let previous = attempts.get(form);
  if (!previous || previous.fingerprint !== fingerprint) {
    previous = { fingerprint, id: crypto.randomUUID(), crmSaved: false, sheetSaved: false, backupStarted: false };
    attempts.set(form, previous);
  }
  const attempt = previous;
  if (attempt.inFlight) {
    return attempt.inFlight;
  }

  const body = JSON.stringify({ ...fields, requestId: attempt.id });
  const post = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true };
  if (!attempt.backupStarted) {
    attempt.backupStarted = true;
    void fetch('/api/lead', post).then(response => {
      if (!response.ok) {
        throw new Error('Sanity');
      }
    }).catch(() => { attempt.backupStarted = false; });
  }

  async function saveContact() {
    if (attempt.crmSaved) {
      return;
    }
    for (let n = 0; n < 2; n++) {
      const response = await fetch('/api/website-inquiry', post).catch(() => null);
      if (response?.ok && (await response.json().catch(() => null))?.ok === true) {
        attempt.crmSaved = true;
        return;
      }
      if (response && response.status < 500) {
        break;
      }
    }
    throw new Error('Nepodařilo se uložit poptávku do CRM.');
  }

  async function saveSheet() {
    if (attempt.sheetSaved) {
      return;
    }
    const data = new FormData();
    for (const [key, value] of Object.entries(fields)) {
      if (typeof value === 'string') {
        data.append(key, value);
      }
    }
    const response = await fetch(sheetEndpoint, { method: 'POST', body: data, keepalive: true });
    if (!response.ok) {
      throw new Error('Nepodařilo se uložit poptávku do tabulky.');
    }
    attempt.sheetSaved = true;
  }

  attempt.inFlight = Promise.allSettled([saveContact(), saveSheet()]).then(results => {
    const failure = results.find(result => result.status === 'rejected');
    if (failure?.status === 'rejected') {
      throw failure.reason;
    }
    attempts.delete(form);
  }).finally(() => { attempt.inFlight = undefined; });
  return attempt.inFlight;
}
