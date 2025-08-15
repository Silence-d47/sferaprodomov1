import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroSlide',
  title: 'Hero slide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Podnázev',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Popis',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'bgImage',
      title: 'Obrázek na pozadí',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'slideType',
      title: 'Typ slide',
      type: 'string',
      options: {
        list: [
          {title: 'Intro', value: 'intro'},
          {title: 'Reference', value: 'reference'},
          {title: 'Blog', value: 'blog'},
          {title: 'Service', value: 'service'},
        ],
      },
      initialValue: 'intro',
    }),
    defineField({
      name: 'features',
      title: 'Funkce',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action (CTA)',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text CTA',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Odkaz CTA',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Telefonní číslo',
      type: 'string',
    }),
    defineField({
      name: 'bgColor',
        title: 'Barva pozadí (tailwind)',
      type: 'string',
      description: 'Tailwind gradient classes for background',
    }),
    defineField({
      name: 'order',
      title: 'Pořadí',
      type: 'number',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Zobrazit',
      type: 'boolean',
      initialValue: true,
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
      title: 'title',
      subtitle: 'slideType',
      media: 'bgImage',
    },
  },
})
