import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'clientTitle',
      title: 'Client Title/Position',
      type: 'string',
    }),
    defineField({
      name: 'clientCompany',
      title: 'Client Company',
      type: 'string',
    }),
    defineField({
      name: 'clientImage',
      title: 'Client Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 6,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'service',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          {title: 'Klimatizace', value: 'klimatizace'},
          {title: 'Tepelná čerpadla', value: 'tepelna-cerpadla'},
          {title: 'Rekuperace', value: 'rekuperace'},
          {title: 'Elektroinstalace', value: 'elektroinstalace'},
          {title: 'Fotovoltaika', value: 'fotovoltaika'},
        ],
      },
    }),
    defineField({
      name: 'projectReference',
      title: 'Related Project Reference',
      type: 'reference',
      to: {type: 'reference'},
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'dateCompleted',
      title: 'Project Completion Date',
      type: 'date',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Testimonial',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
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
      title: 'clientName',
      subtitle: 'service',
      media: 'clientImage',
    },
  },
})
