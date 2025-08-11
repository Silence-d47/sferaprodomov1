import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featureCard',
  title: 'Feature Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide React icon name (e.g., CreditCard, CheckCircle, Calendar)',
    }),
    defineField({
      name: 'iconColor',
      title: 'Icon Color',
      type: 'string',
      description: 'Tailwind color classes for icon',
    }),
    defineField({
      name: 'iconBgColor',
      title: 'Icon Background Color',
      type: 'string',
      description: 'Tailwind background color classes for icon container',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Homepage Features', value: 'homepage'},
          {title: 'Why Choose Us', value: 'why-choose-us'},
          {title: 'Service Benefits', value: 'service-benefits'},
          {title: 'Process Steps', value: 'process-steps'},
        ],
      },
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
      title: 'title',
      subtitle: 'category',
    },
  },
})
