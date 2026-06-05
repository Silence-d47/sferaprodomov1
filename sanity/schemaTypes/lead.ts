import { defineField, defineType } from 'sanity'

const STATUS_LABELS: Record<string, string> = {
  new: 'Nová',
  contacted: 'Kontaktováno',
  won: 'Vyhráno',
  lost: 'Ztraceno',
}

export default defineType({
  name: 'lead',
  title: 'Poptávka',
  type: 'document',
  groups: [
    { name: 'contact', title: 'Kontakt', default: true },
    { name: 'meta', title: 'Zdroj a kampaň' },
    { name: 'workflow', title: 'Stav' },
  ],
  fields: [
    defineField({
      name: 'submittedAt',
      title: 'Odesláno',
      type: 'datetime',
      readOnly: true,
      group: 'contact',
    }),
    defineField({
      name: 'name',
      title: 'Jméno a příjmení',
      type: 'string',
      readOnly: true,
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      readOnly: true,
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      readOnly: true,
      group: 'contact',
    }),
    defineField({
      name: 'zipCode',
      title: 'PSČ',
      type: 'string',
      readOnly: true,
      group: 'contact',
    }),
    defineField({
      name: 'service',
      title: 'Služba',
      type: 'string',
      readOnly: true,
      group: 'contact',
    }),
    defineField({
      name: 'message',
      title: 'Zpráva',
      type: 'text',
      rows: 4,
      readOnly: true,
      group: 'contact',
    }),
    defineField({
      name: 'source',
      title: 'Zdroj formuláře',
      type: 'string',
      readOnly: true,
      group: 'meta',
    }),
    defineField({
      name: 'utmSource',
      title: 'UTM Source',
      type: 'string',
      readOnly: true,
      group: 'meta',
    }),
    defineField({
      name: 'utmMedium',
      title: 'UTM Medium',
      type: 'string',
      readOnly: true,
      group: 'meta',
    }),
    defineField({
      name: 'utmCampaign',
      title: 'UTM Campaign',
      type: 'string',
      readOnly: true,
      group: 'meta',
    }),
    defineField({
      name: 'utmTerm',
      title: 'UTM Term',
      type: 'string',
      readOnly: true,
      group: 'meta',
    }),
    defineField({
      name: 'utmContent',
      title: 'UTM Content',
      type: 'string',
      readOnly: true,
      group: 'meta',
    }),
    defineField({
      name: 'status',
      title: 'Stav',
      type: 'string',
      options: {
        list: [
          { title: STATUS_LABELS.new, value: 'new' },
          { title: STATUS_LABELS.contacted, value: 'contacted' },
          { title: STATUS_LABELS.won, value: 'won' },
          { title: STATUS_LABELS.lost, value: 'lost' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      group: 'workflow',
    }),
    defineField({
      name: 'note',
      title: 'Interní poznámka',
      type: 'text',
      rows: 3,
      group: 'workflow',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      service: 'service',
      submittedAt: 'submittedAt',
      status: 'status',
    },
    prepare({ name, email, service, submittedAt, status }) {
      const date = submittedAt
        ? new Date(submittedAt).toLocaleDateString('cs-CZ', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          })
        : ''
      const parts = [date, service, STATUS_LABELS[status] || status].filter(Boolean)
      return {
        title: name || email || 'Neznámý kontakt',
        subtitle: parts.join(' · '),
      }
    },
  },
  orderings: [
    {
      title: 'Nejnovější',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Nejstarší',
      name: 'submittedAtAsc',
      by: [{ field: 'submittedAt', direction: 'asc' }],
    },
  ],
})
