import { defineField, defineType } from 'sanity'
import { apiVersion } from '@/sanity/env'
import {
  createResponsiveImageInput,
  type CropConfig,
} from '@/sanity/components/ResponsiveImageInput'
import { deviceCropsField } from '@/sanity/fields/deviceCrops'

const REFERENCE_IMAGE_CROPS: CropConfig[] = [
  { key: 'card', label: 'Karta', ratio: '1:1', aspect: 1 },
  { key: 'slider', label: 'Slider', ratio: '5:4', aspect: 5 / 4 },
  { key: 'detail', label: 'Detail', ratio: '3:2', aspect: 3 / 2 },
]

export default defineType({
  name: 'projectReference',
  title: 'Reference',
  type: 'document',
  groups: [
    { name: 'content', title: 'Obsah', default: true },
    { name: 'media', title: 'Média' },
    { name: 'details', title: 'Detaily' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Nadpis H1',
      description: 'Obecný nadpis stránky',
      type: 'string',
      group: 'content',
      validation: (rule) => [
        rule.required().error('Nadpis je povinný'),
        rule.min(20).warning('Nadpis by měl mít alespoň 20 znaků'),
        rule.max(70).warning('Nadpis by neměl přesáhnout 70 znaků'),
      ],
    }),
    defineField({
      name: 'subtitle',
      title: 'Podnadpis H2',
      description: 'Specifický nadpis projektu',
      type: 'string',
      group: 'content',
      validation: (rule) => [
        rule.required().error('Podnadpis je povinný'),
        rule.min(20).warning('Podnadpis by měl mít alespoň 20 znaků'),
        rule.max(70).warning('Podnadpis by neměl přesáhnout 70 znaků'),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      description: 'Generuje se z Podnadpis H2',
      type: 'slug',
      group: 'seo',
      options: {
        source: 'subtitle',
        maxLength: 96,
      },
      validation: (rule) =>
        rule.required().custom(async (slug, context) => {
          if (!slug?.current) {
            return 'Slug je povinný'
          }
          const client = context.getClient({ apiVersion })
          const id = context.document?._id?.replace(/^drafts\./, '')
          const count = await client.fetch(
            `count(*[_type == "projectReference" && slug.current == $slug && !(_id in [$id, $draftId])])`,
            { slug: slug.current, id, draftId: `drafts.${id}` },
          )
          return count > 0 ? 'Tento slug již existuje, zvolte jiný' : true
        }),
    }),
    defineField({
      name: 'body',
      title: 'Obsah',
      description: 'Hlavní text reference (Portable Text)',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Popis (zastaralé)',
      description: 'Toto pole je nahrazeno polem "Obsah". Bude odstraněno po migraci.',
      type: 'text',
      rows: 4,
      group: 'content',
      readOnly: true,
      deprecated: { reason: 'Nahrazeno polem body (blockContent)' },
    }),
    defineField({
      name: 'highlights',
      title: 'Hlavní body projektu',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Klimatizace', value: 'klimatizace' },
          { title: 'Tepelná čerpadla', value: 'tepelna-cerpadla' },
          { title: 'Rekuperace', value: 'rekuperace' },
          { title: 'Elektroinstalace', value: 'elektroinstalace' },
          { title: 'Fotovoltaika', value: 'fotovoltaika' },
          { title: 'Komerční', value: 'komercni' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Hlavní obrázek',
      description: 'Doporučeno min. 1200x800px. Preferovaný formát JPG nebo PNG.',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [deviceCropsField],
      components: {
        input: createResponsiveImageInput(REFERENCE_IMAGE_CROPS),
      },
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube video',
      description:
        'Odkaz na YouTube video k této referenci. Pokud je vyplněno, zobrazí se místo hlavního obrázku.',
      type: 'url',
      group: 'media',
      validation: (rule) =>
        rule.custom((url: string | undefined) => {
          if (!url) {
            return true
          }
          const pattern = /^https:\/\/(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)/
          return pattern.test(url) || 'Zadejte platný YouTube odkaz'
        }),
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie',
      description: 'Fotografie projektu. Doporučeno min. 1200x800px.',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'beforeAfter',
      title: 'Před/Po fotky',
      type: 'object',
      group: 'media',
      fields: [
        {
          name: 'before',
          title: 'Před',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'after',
          title: 'Po',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'location',
      title: 'Místo',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'year',
      title: 'Rok dokončení',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'rating',
      title: 'Hodnocení',
      type: 'number',
      group: 'details',
      validation: (rule) => rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'savings',
      title: 'Výhody / Úspora',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Zobrazit jako referenci',
      type: 'boolean',
      group: 'details',
      initialValue: false,
    }),
    defineField({
      name: 'isTopReference',
      title: 'Zobrazit jako top reference',
      type: 'boolean',
      group: 'details',
      initialValue: false,
    }),
    defineField({
      name: 'projectDetails',
      title: 'Detaily projektu',
      type: 'object',
      group: 'details',
      fields: [
        {
          name: 'clientType',
          title: 'Typ zákazníka',
          type: 'string',
          options: {
            list: [
              { title: 'Soukromý', value: 'residential' },
              { title: 'Komerční', value: 'commercial' },
              { title: 'Průmyslový', value: 'industrial' },
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
      group: 'details',
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
      group: 'details',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Označení', type: 'string' },
            { name: 'value', title: 'Hodnota', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta nadpis',
          description: 'Doporučeno 30–70 znaků',
          type: 'string',
          validation: (rule) => [
            rule.max(70).warning('Meta nadpis by neměl přesáhnout 70 znaků'),
            rule.min(30).warning('Meta nadpis by měl mít alespoň 30 znaků'),
          ],
        },
        {
          name: 'metaDescription',
          title: 'Meta popis',
          description: 'Doporučeno 70–150 znaků',
          type: 'text',
          rows: 3,
          validation: (rule) => [
            rule.max(150).warning('Meta popis by neměl přesáhnout 150 znaků'),
            rule
              .min(120)
              .warning('Meta popis by měl mít alespoň 120 znaků (Google doporučuje 120-160)'),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || '',
        media,
      }
    },
  },
})
