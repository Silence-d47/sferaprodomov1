import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'článek',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'článek',
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
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Hlavní obrázek',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Kategorie',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publikováno',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'úvod',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'body',
      title: 'Tělo',
      type: 'blockContent',
    }),
    defineField({
      name: 'readingTime',
      title: 'Přečteno za (minut)',
      type: 'number',
      initialValue: 5,
    }),
    defineField({
      name: 'featured',
      title: 'Nejnovější články',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta nadpis',
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
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
