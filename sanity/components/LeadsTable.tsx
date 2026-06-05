import { useCallback, useEffect, useState } from 'react';
import { useClient } from 'sanity';
import { useIntentLink } from 'sanity/router';
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Select,
  Spinner,
  Stack,
  Text,
  TextArea,
  useToast,
} from '@sanity/ui';
import { TrashIcon } from '@sanity/icons';

const API_VERSION = '2026-03-05';

const STATUS_OPTIONS = [
  { value: 'new', label: 'Nová', tone: 'primary', color: '#3b82f6' },
  { value: 'contacted', label: 'Kontaktováno', tone: 'caution', color: '#eab308' },
  { value: 'won', label: 'Vyhráno', tone: 'positive', color: '#22c55e' },
  { value: 'lost', label: 'Ztraceno', tone: 'critical', color: '#ef4444' },
] as const;

const SERVICE_LABELS: Record<string, string> = {
  klimatizace: 'Klimatizace',
  'tepelna-cerpadla': 'Tepelná čerpadla',
  rekuperace: 'Rekuperace',
  elektroinstalace: 'Elektroinstalace',
  fotovoltaika: 'Fotovoltaika',
  servis: 'Servis a revize',
  jine: 'Jiný dotaz',
};

const PAGE_SIZE = 20;

const LEADS_QUERY = `{
  "items": *[_type == "lead" && ($status == "all" || status == $status)] | order(submittedAt desc)[$start...$end]{
    _id, submittedAt, name, phone, email, zipCode, service, source, status, message, note,
    utmSource, utmMedium, utmCampaign, utmTerm, utmContent
  },
  "total": count(*[_type == "lead" && ($status == "all" || status == $status)])
}`;

interface Lead {
  _id: string;
  submittedAt?: string;
  name?: string;
  phone?: string;
  email?: string;
  zipCode?: string;
  service?: string;
  source?: string;
  status?: string;
  message?: string;
  note?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

function formatDate(value?: string): string {
  if (!value) {
    return '';
  }
  return new Date(value).toLocaleString('cs-CZ', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function statusColor(status?: string): string {
  return STATUS_OPTIONS.find((option) => option.value === status)?.color ?? STATUS_OPTIONS[0].color;
}

function utmFields(lead: Lead): { label: string; value?: string }[] {
  return [
    { label: 'UTM Source', value: lead.utmSource },
    { label: 'UTM Medium', value: lead.utmMedium },
    { label: 'UTM Campaign', value: lead.utmCampaign },
    { label: 'UTM Term', value: lead.utmTerm },
    { label: 'UTM Content', value: lead.utmContent },
  ];
}

function Field({ label, value, href }: { label: string; value?: string; href?: string }) {
  if (!value) {
    return (
      <Text size={1} muted style={{ textDecoration: 'line-through' }}>
        {label}
      </Text>
    );
  }
  return (
    <Text size={1}>
      <span style={{ opacity: 0.55 }}>{label}: </span>
      {href ? <a href={href}>{value}</a> : value}
    </Text>
  );
}

function DeleteDialog({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  return (
    <Dialog
      id="delete-lead"
      header="Smazat poptávku"
      width={0}
      onClose={onClose}
      footer={
        <Flex gap={2} justify="flex-end" padding={3}>
          <Button text="Zrušit" mode="ghost" onClick={onClose} />
          <Button text="Smazat" tone="critical" icon={TrashIcon} onClick={onConfirm} />
        </Flex>
      }
    >
      <Box padding={4}>
        <Text>Opravdu chcete trvale smazat tuto poptávku? Akci nelze vrátit zpět.</Text>
      </Box>
    </Dialog>
  );
}

function LeadCard({
  lead,
  onPatch,
  onDelete,
}: {
  lead: Lead;
  onPatch: (id: string, fields: Partial<Lead>, successTitle?: string) => void;
  onDelete: (id: string) => void;
}) {
  const detail = useIntentLink({ intent: 'edit', params: { id: lead._id, type: 'lead' } });
  const service = SERVICE_LABELS[lead.service ?? ''] ?? lead.service;
  const utm = utmFields(lead);
  const [note, setNote] = useState(lead.note ?? '');
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const saveNote = () => {
    if (note !== (lead.note ?? '')) {
      onPatch(lead._id, { note }, 'Poznámka uložena');
    }
  };

  return (
    <Card
      padding={3}
      radius={2}
      shadow={1}
      style={{ borderLeft: `4px solid ${statusColor(lead.status)}` }}
    >
      <Stack space={3}>
        <Flex align="flex-start" gap={3}>
          <Stack flex={1} space={2}>
            <Text
              size={1}
              weight="semibold"
              muted={!lead.name}
              style={lead.name ? undefined : { textDecoration: 'line-through' }}
            >
              {lead.name || 'Jméno a příjmení'}
            </Text>
            <Flex align="center" gap={3} wrap="wrap">
              <Field
                label="Telefon"
                value={lead.phone}
                href={lead.phone ? `tel:${lead.phone}` : undefined}
              />
              <Field
                label="E-mail"
                value={lead.email}
                href={lead.email ? `mailto:${lead.email}` : undefined}
              />
            </Flex>
            <Flex align="center" gap={3} wrap="wrap">
              <Field label="Odesláno" value={formatDate(lead.submittedAt)} />
              <Field label="PSČ" value={lead.zipCode} />
              <Field label="Služba" value={service} />
              <Field label="Zdroj formuláře" value={lead.source} />
            </Flex>
            <Flex align="center" gap={3} wrap="wrap">
              {utm.map((field) => (
                <Field key={field.label} label={field.label} value={field.value} />
              ))}
            </Flex>
            <Field label="Zpráva" value={lead.message} />
          </Stack>
          <Flex align="center" gap={2}>
            <Box style={{ minWidth: 150 }}>
              <Select
                fontSize={1}
                value={lead.status || 'new'}
                onChange={(event) => onPatch(lead._id, { status: event.currentTarget.value })}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Box>
            <a href={detail.href} onClick={detail.onClick}>
              <Text size={1}>Editovat</Text>
            </a>
            <Button
              icon={TrashIcon}
              mode="bleed"
              tone="critical"
              aria-label="Smazat poptávku"
              onClick={() => setConfirmingDelete(true)}
            />
          </Flex>
        </Flex>
        <Stack space={2}>
          <Text size={1} style={{ opacity: 0.55 }}>
            Interní poznámka
          </Text>
          <TextArea
            fontSize={1}
            rows={2}
            placeholder="Přidat vlastní poznámku..."
            value={note}
            onChange={(event) => setNote(event.currentTarget.value)}
            onBlur={saveNote}
          />
        </Stack>
      </Stack>
      {confirmingDelete && (
        <DeleteDialog
          onClose={() => setConfirmingDelete(false)}
          onConfirm={() => {
            setConfirmingDelete(false);
            onDelete(lead._id);
          }}
        />
      )}
    </Card>
  );
}

interface LeadsPage {
  items: Lead[];
  total: number;
}

export function LeadsTable() {
  const client = useClient({ apiVersion: API_VERSION });
  const toast = useToast();
  const [data, setData] = useState<LeadsPage | null>(null);
  const [failed, setFailed] = useState(false);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(0);

  const load = useCallback(() => {
    setFailed(false);
    client
      .fetch<LeadsPage>(LEADS_QUERY, {
        status: filter,
        start: page * PAGE_SIZE,
        end: page * PAGE_SIZE + PAGE_SIZE,
      })
      .then(setData)
      .catch(() => setFailed(true));
  }, [client, filter, page]);

  useEffect(() => {
    load();
  }, [load]);

  const selectFilter = (next: string) => {
    setPage(0);
    setFilter(next);
  };

  const handlePatch = useCallback(
    (id: string, fields: Partial<Lead>, successTitle?: string) => {
      setData((prev) =>
        prev
          ? { ...prev, items: prev.items.map((l) => (l._id === id ? { ...l, ...fields } : l)) }
          : prev,
      );
      client
        .patch(id)
        .set(fields)
        .commit()
        .then(() => {
          if (successTitle) {
            toast.push({ status: 'success', title: successTitle });
          }
        })
        .catch(() => {
          toast.push({ status: 'error', title: 'Změnu se nepodařilo uložit' });
          load();
        });
    },
    [client, toast, load],
  );

  const handleDelete = useCallback(
    (id: string) => {
      client
        .delete(id)
        .then(() => {
          toast.push({ status: 'success', title: 'Poptávka smazána' });
          load();
        })
        .catch(() => {
          toast.push({ status: 'error', title: 'Smazání se nepodařilo' });
        });
    },
    [client, toast, load],
  );

  if (failed) {
    return (
      <Box padding={4}>
        <Flex align="center" gap={3}>
          <Text>Načtení poptávek selhalo.</Text>
          <Button text="Zkusit znovu" onClick={load} />
        </Flex>
      </Box>
    );
  }

  if (!data) {
    return (
      <Flex align="center" justify="center" padding={5}>
        <Spinner muted />
      </Flex>
    );
  }

  const totalPages = Math.max(1, Math.ceil(data.total / PAGE_SIZE));

  return (
    <Box padding={4}>
      <Stack space={4}>
        <Stack space={3}>
          <Flex align="center" justify="space-between">
            <Text weight="semibold">Počet poptávek: {data.total}</Text>
            <Button text="Obnovit" mode="ghost" onClick={load} />
          </Flex>
          <Flex gap={2} wrap="wrap">
            <Button
              text="Vše"
              mode={filter === 'all' ? 'default' : 'ghost'}
              onClick={() => selectFilter('all')}
            />
            {STATUS_OPTIONS.map((option) => (
              <Button
                key={option.value}
                text={option.label}
                tone={option.tone}
                mode={filter === option.value ? 'default' : 'ghost'}
                onClick={() => selectFilter(option.value)}
              />
            ))}
          </Flex>
        </Stack>
        {data.total === 0 ? (
          <Text muted>Žádné poptávky.</Text>
        ) : (
          <Stack space={3}>
            <Stack space={2}>
              {data.items.map((lead) => (
                <LeadCard
                  key={lead._id}
                  lead={lead}
                  onPatch={handlePatch}
                  onDelete={handleDelete}
                />
              ))}
            </Stack>
            <Flex align="center" justify="space-between">
              <Button
                text="Předchozí"
                mode="ghost"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              />
              <Text size={1} muted>
                Stránka {page + 1} z {totalPages}
              </Text>
              <Button
                text="Další"
                mode="ghost"
                disabled={page + 1 >= totalPages}
                onClick={() => setPage(page + 1)}
              />
            </Flex>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
