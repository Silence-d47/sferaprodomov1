import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Služba',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'název',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Popis',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'icon',
      title: 'Ikona',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'hoverColor',
      title: 'Barva hover',
      type: 'string',
      description: 'Tailwind třída pro hover barvu',
    }),
    defineField({
      name: 'link',
      title: 'odkaz na stránku servisu',
      type: 'string',
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
      name: 'features',
      title: 'Klíčové vlastnosti',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'benefits',
      title: 'Výhody',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Obsah stránky',
      type: 'blockContent',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta název',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta popis',
          type: 'text',
          rows: 3,
        },
      ],
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
      title: 'title',
      media: 'icon',
    },
  },
})
