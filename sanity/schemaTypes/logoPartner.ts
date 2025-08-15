import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'logoPartner',
  title: 'Logo partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Jméno / název partner',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'website',
      title: 'Website URL (pokud existuje)',
      type: 'url',
    }),
    defineField({
      name: 'category',
      title: 'Kategorie (typ partnerství)',
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
      name: 'description',
      title: 'Popis',
      type: 'text',
      rows: 3,
    }),
  ],
  orderings: [
    {
        title: 'Sestupné pořadí',
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
