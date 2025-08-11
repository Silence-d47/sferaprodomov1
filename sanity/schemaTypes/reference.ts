import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projectReference',
  title: 'Project Reference',
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
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{
        type: 'image',
        options: {hotspot: true},
      }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
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
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year Completed',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'highlights',
      title: 'Project Highlights',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'savings',
      title: 'Savings/Benefits',
      type: 'string',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Reference',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isTopReference',
      title: 'Top Reference',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'projectDetails',
      title: 'Project Details',
      type: 'object',
      fields: [
        {
          name: 'clientType',
          title: 'Client Type',
          type: 'string',
          options: {
            list: [
              {title: 'Residential', value: 'residential'},
              {title: 'Commercial', value: 'commercial'},
              {title: 'Industrial', value: 'industrial'},
            ],
          },
        },
        {
          name: 'projectSize',
          title: 'Project Size (m²)',
          type: 'number',
        },
        {
          name: 'duration',
          title: 'Project Duration (days)',
          type: 'number',
        },
        {
          name: 'teamSize',
          title: 'Team Size',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 4,
        },
        {
          name: 'clientName',
          title: 'Client Name',
          type: 'string',
        },
        {
          name: 'clientTitle',
          title: 'Client Title/Position',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'technicalSpecs',
      title: 'Technical Specifications',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'label', title: 'Label', type: 'string'},
          {name: 'value', title: 'Value', type: 'string'},
        ],
      }],
    }),
    defineField({
      name: 'beforeAfter',
      title: 'Before/After Images',
      type: 'object',
      fields: [
        {
          name: 'before',
          title: 'Before Image',
          type: 'image',
          options: {hotspot: true},
        },
        {
          name: 'after',
          title: 'After Image',
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
      subtitle: 'location',
      media: 'image',
    },
  },
})
