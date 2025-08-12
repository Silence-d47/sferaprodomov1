import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'logoPartner',
  title: 'Logo partnera',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Jméno / název partnera',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo obrázek',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          {title: 'partnerství značka', value: 'brand'},
          {title: 'partnerství technologie', value: 'technology'},
          {title: 'školící středisko / vzdělávání ', value: 'certification'},
          {title: 'dodavatel', value: 'supplier'},
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Zobrazit pořadí',
      type: 'number',
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivní',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'description',
      title: 'Popis',
      type: 'text',
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: 'Pořadí',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'logo',
    },
  },
})
