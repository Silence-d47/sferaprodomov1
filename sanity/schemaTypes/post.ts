import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Článek',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Uživatel',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Obrázek',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Kategorie (pokud existuje)',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Datum publikace',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Úvod',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'blockContent',
    }),
    defineField({
      name: 'readingTime',
      title: 'Přečteno za (minut) - automatické',
      type: 'number',
      initialValue: 5,
    }),
    defineField({
      name: 'featured',
      title: 'Zobrazit jako nejnovější články',
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
          title: 'Meta nadpis (pokud existuje)',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta popis (pokud existuje)',
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
