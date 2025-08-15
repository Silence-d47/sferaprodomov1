import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'Často kladené otázky',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Otázka',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Odpověď',
      type: 'blockContent',
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          {title: 'Klimatizace', value: 'klimatizace'},
          {title: 'Tepelná čerpadla', value: 'tepelna-cerpadla'},
          {title: 'Rekuperace', value: 'rekuperace'},
          {title: 'Elektroinstalace', value: 'elektroinstalace'},
          {title: 'Fotovoltaika', value: 'fotovoltaika'},
          {title: 'Obecné', value: 'obecne'},
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Pořadí',
      type: 'number',
    }),
    defineField({
      name: 'isActive',
      title: 'Zobrazit',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'tags',
      title: 'Štítky',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
  },
})
