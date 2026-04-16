const UTM_STORAGE_KEY = 'sfera-utm-params';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

export interface UtmParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export function captureUtmParams(): void {
  if (typeof window === 'undefined') {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const utmParams: UtmParams = {};
  let hasUtm = false;

  for (const key of UTM_KEYS) {
    const value = urlParams.get(key);
    if (value) {
      utmParams[key] = value;
      hasUtm = true;
    }
  }

  if (hasUtm) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmParams));
  }
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function appendUtmToFormData(formData: FormData): void {
  const utm = getStoredUtmParams();
  for (const key of UTM_KEYS) {
    if (utm[key]) {
      formData.append(key, utm[key]);
    }
  }
}
