import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {type: 'category'},
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'isRecommended',
      title: 'Recommended Product',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isBestSelling',
      title: 'Best Selling Product',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'catalogUrl',
      title: 'Catalog PDF URL',
      type: 'url',
      description: 'Legacy field - use files array instead',
    }),
    defineField({
      name: 'files',
      title: 'Product Files',
      type: 'array',
      of: [{
        type: 'reference',
        to: {type: 'fileAsset'},
      }],
      description: 'Datasheets, catalogs, manuals, and other product files',
    }),
    defineField({
      name: 'energyClass',
      title: 'Energy Class',
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
      title: 'Technical Specifications',
      type: 'object',
      fields: [
        {
          name: 'powerRange',
          title: 'Výkon (kW)',
          type: 'object',
          fields: [
            {name: 'min', title: 'Od (kW)', type: 'number'},
            {name: 'max', title: 'Do (kW)', type: 'number'},
          ],
          description: 'Rozsah výkonu v kilowattech (např. od 2 do 5 kW)',
        },
        {
          name: 'coolingCapacityRange',
          title: 'Chladicí výkon (kW)',
          type: 'object',
          fields: [
            {name: 'min', title: 'Od (kW)', type: 'number'},
            {name: 'max', title: 'Do (kW)', type: 'number'},
          ],
          description: 'Rozsah chladicího výkonu v kilowattech',
        },
        {
          name: 'heatingCapacityRange',
          title: 'Topný výkon (kW)',
          type: 'object',
          fields: [
            {name: 'min', title: 'Od (kW)', type: 'number'},
            {name: 'max', title: 'Do (kW)', type: 'number'},
          ],
          description: 'Rozsah topného výkonu v kilowattech',
        },
        {
          name: 'noiseLevel',
          title: 'Hladina hluku (dB)',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price Information',
      type: 'object',
      fields: [
        {
          name: 'basePrice',
          title: 'Base Price (CZK)',
          type: 'number',
        },
        {
          name: 'installationPrice',
          title: 'Installation Price (CZK)',
          type: 'number',
        },
        {
          name: 'showPrice',
          title: 'Show Price on Website',
          type: 'boolean',
          initialValue: false,
        },
      ],
    }),
    defineField({
      name: 'warranty',
      title: 'Warranty (years)',
      type: 'number',
      initialValue: 2,
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
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
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
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
