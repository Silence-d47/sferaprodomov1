import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Zkušenosti klientů',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Jméno nebo název',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'clientTitle',
      title: 'role zákazníka',
      type: 'string',
    }),
    defineField({
      name: 'clientCompany',
      title: 'firma zákazníka',
      type: 'string',
    }),
    defineField({
      name: 'clientImage',
      title: 'obrázek zákazníka',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'quote',
      title: 'citace zkušenosti (s úvozovkama, ten hlavní text)',
      type: 'text',
      rows: 6,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'hodnocení',
      type: 'number',
      validation: Rule => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'service',
      title: 'Kategorie služby',
      type: 'string',
      options: {
        list: [
          {title: 'Klimatizace', value: 'klimatizace'},
          {title: 'Tepelná čerpadla', value: 'tepelna-cerpadla'},
          {title: 'Rekuperace', value: 'rekuperace'},
          {title: 'Elektroinstalace', value: 'elektroinstalace'},
          {title: 'Fotovoltaika', value: 'fotovoltaika'},
        ],
      },
    }),
    defineField({
      name: 'projectReference',
      title: 'Patří k projektu z referencí',
      type: 'reference',
      to: {type: 'projectReference'},
    }),
    defineField({
      name: 'location',
      title: 'Místo',
      type: 'string',
    }),
    defineField({
      name: 'dateCompleted',
      title: 'Datum dokončení',
      type: 'date',
    }),
    defineField({
      name: 'isFeatured',
      title: 'zobrazit v náhledech zkušeností?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Zobrazit pořadí',
      type: 'number',
    }),
    defineField({
      name: 'isActive',
      title: 'aktivní',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'Seřadit vzestupně',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'service',
      media: 'clientImage',
    },
  },
})
