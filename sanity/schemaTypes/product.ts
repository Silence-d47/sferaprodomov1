import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Produkt',
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
      name: 'category',
      title: 'Kategorie (pokud existuje)',
      type: 'reference',
      to: {type: 'category'},
    }),
    defineField({
      name: 'features',
      title: 'Funkce',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'isRecommended',
      title: 'Zobrazit jako doporučený produkt',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isBestSelling',
      title: 'Zobrazit jako nejprodávanější produkt',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'catalogUrl',
      title: 'odkaz (URL) pro katalog k produktu (pokud existuje)',
      type: 'url',
      description: 'Legacy field - use files array instead',
    }),
    defineField({
      name: 'files',
      title: 'Soubory k produktu (pokud existují)',
      type: 'array',
      of: [{
        type: 'reference',
        to: {type: 'fileAsset'},
      }],
      description: 'Datové listy, katalog, manuál a další soubory, které patří k danému produktu',
    }),
    defineField({
      name: 'energyClass',
      title: 'Energická třída',
      type: 'string',
      options: {
        list: [
          {title: 'A+++', value: 'A+++'},
          {title: 'A++', value: 'A++'},
          {title: 'A+', value: 'A+'},
          {title: 'A', value: 'A'},
          {title: 'B', value: 'B'},
          {title: 'C', value: 'C'},
        ],
      },
    }),
    defineField({
      name: 'specifications',
      title: 'Technické specifikace',
      type: 'object',
      fields: [
        {
          name: 'power',
          title: 'výkon(kW)',
          type: 'number',
        },
        {
          name: 'coolingCapacity',
          title: 'chladící kapacita(kW)',
          type: 'number',
        },
        {
          name: 'heatingCapacity',
          title: 'kapacita výhřevu(kW)',
          type: 'number',
        },
        {
          name: 'noiseLevel',
          title: 'Hlučnost(dB)',
          type: 'number',
        },
        {
          name: 'dimensions',
          title: 'Rozměry',
          type: 'object',
          fields: [
            {name: 'width', title: 'Šířka (mm)', type: 'number'},
            {name: 'height', title: 'Výška (mm)', type: 'number'},
            {name: 'depth', title: 'Hloubka (mm)', type: 'number'},
          ],
        },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Informace o ceně',
      type: 'object',
      fields: [
        {
          name: 'basePrice',
          title: 'Základní cena (Kč)',
          type: 'number',
        },
        {
          name: 'installationPrice',
          title: 'Cena za práci a instalaci (Kč)',
          type: 'number',
        },
        {
          name: 'showPrice',
          title: 'Zobrazit cenu na stránce',
          type: 'boolean',
          initialValue: false,
        },
      ],
    }),
    defineField({
      name: 'warranty',
      title: 'Záruka (roky)',
      type: 'number',
      initialValue: 2,
    }),
    defineField({
      name: 'brand',
      title: 'Značka',
      type: 'string',
      options: {
        list: [
          {title: 'Daikin', value: 'daikin'},
          {title: 'Mitsubishi', value: 'mitsubishi'},
          {title: 'LG', value: 'lg'},
          {title: 'Panasonic', value: 'panasonic'},
          {title: 'Fujitsu', value: 'fujitsu'},
          {title: 'Samsung', value: 'samsung'},
          {title: 'Toshiba', value: 'toshiba'},
        ],
      },
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
      subtitle: 'brand',
      media: 'image',
    },
  },
})
