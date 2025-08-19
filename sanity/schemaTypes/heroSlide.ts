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
      name: 'primaryButton',
      title: 'Primární tlačítko (oranžové)',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text tlačítka',
          type: 'string',
          initialValue: 'Nezávazná nabídka',
        },
        {
          name: 'link',
          title: 'Odkaz',
          type: 'string',
          initialValue: '/kontakt',
        },
        {
          name: 'isActive',
          title: 'Zobrazit tlačítko',
          type: 'boolean',
          initialValue: true,
        },
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Sekundární tlačítko (modré)',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text tlačítka',
          type: 'string',
          initialValue: 'Zavolejte nám',
        },
        {
          name: 'link',
          title: 'Odkaz',
          type: 'string',
          initialValue: 'tel:+420735014112',
        },
        {
          name: 'isActive',
          title: 'Zobrazit tlačítko',
          type: 'boolean',
          initialValue: true,
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
