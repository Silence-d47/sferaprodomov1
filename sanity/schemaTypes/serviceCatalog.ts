import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'serviceCatalog',
  title: 'Katalog služby',
  type: 'document',
  fields: [
    defineField({
      name: 'service',
      title: 'Služba',
      type: 'string',
      options: {
        list: [
          { title: 'Klimatizace', value: 'klimatizace' },
          { title: 'Tepelná čerpadla', value: 'tepelna-cerpadla' },
          { title: 'Rekuperace', value: 'rekuperace' },
          { title: 'Elektroinstalace', value: 'elektroinstalace' },
          { title: 'Fotovoltaika', value: 'fotovoltaika' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Text tlačítka',
      description: 'Např. "Stáhnout kompletní katalog klimatizací"',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'catalogFile',
      title: 'PDF soubor',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'service',
    },
  },
})
