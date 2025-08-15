import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projectReference',
  title: 'Projektová reference',
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
      name: 'description',
      title: 'Popis',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Obrázek',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie (pokud existuje)',
      type: 'array',
      of: [{
        type: 'image',
        options: {hotspot: true},
      }],
    }),
    defineField({
      name: 'category',
      title: 'Kategorie (pokud existuje)',
      type: 'string',
      options: {
        list: [
          {title: 'Klimatizace', value: 'klimatizace'},
          {title: 'Tepelná čerpadla', value: 'tepelna-cerpadla'},
          {title: 'Rekuperace', value: 'rekuperace'},
          {title: 'Elektroinstalace', value: 'elektroinstalace'},
          {title: 'Fotovoltaika', value: 'fotovoltaika'},
          {title: 'Komerční', value: 'komercni'},
        ],
      },
    }),
    defineField({
      name: 'location',
      title: 'Místo (pokud existuje)',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Rok dokončení (pokud existuje)',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Hodnocení',
      type: 'number',
      validation: Rule => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'highlights',
      title: 'Hlavní body projektu',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'savings',
      title: 'Výhody / Úspora',
      type: 'string',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Zobrazit jako referenci',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isTopReference',
      title: 'Zobrazit jako top reference',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'projectDetails',
      title: 'Detaily projektu',
      type: 'object',
      fields: [
        {
          name: 'clientType',
          title: 'Typ zákazníka',
          type: 'string',
          options: {
            list: [
              {title: 'Soukromý', value: 'residential'},
              {title: 'Komerční', value: 'commercial'},
              {title: 'Průmyslový', value: 'industrial'},
            ],
          },
        },
        {
          name: 'projectSize',
          title: 'Rozsah projektu (m²)',
          type: 'number',
        },
        {
          name: 'duration',
          title: 'Doba trvání prací (dny)',
          type: 'number',
        },
        {
          name: 'teamSize',
          title: 'Počet členů týmu',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Zákazníkova zkušenost',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Citace',
          type: 'text',
          rows: 4,
        },
        {
          name: 'clientName',
          title: 'Jméno zákazníka',
          type: 'string',
        },
        {
          name: 'clientTitle',
          title: 'Pozice zákazníka',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'technicalSpecs',
      title: 'Technické specifikace',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'label', title: 'Označení', type: 'string'},
          {name: 'value', title: 'Hodnota', type: 'string'},
        ],
      }],
    }),
    defineField({
      name: 'beforeAfter',
      title: 'Před/Po fotky',
      type: 'object',
      fields: [
        {
          name: 'before',
          title: 'Před',
          type: 'image',
          options: {hotspot: true},
        },
        {
          name: 'after',
          title: 'Po',
          type: 'image',
          options: {hotspot: true},
        },
      ],
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
      subtitle: 'location',
      media: 'image',
    },
  },
})
