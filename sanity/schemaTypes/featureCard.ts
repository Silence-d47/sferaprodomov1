import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featureCard',
  title: 'Nejnovější příspěvek (featureCard)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Názevv',
      type: 'string',
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
      title: 'Název ikony',
      type: 'string',
      description: 'Název ikony z knihovny Lucide React (např. CreditCard, CheckCircle, Calendar, dohledatelné v dokumentaci k lucide-react)',
    }),
    defineField({
      name: 'iconColor',
      title: 'Barva ikonky',
      type: 'string',
      description: 'Třída barvy tailwind pro ikonu',
    }),
    defineField({
      name: 'iconBgColor',
      title: 'Barva pozadí',
      type: 'string',
      description: 'Třída barvy tailwind pro pozadí ikonky',
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          {title: 'Homepage', value: 'homepage'},
          {title: 'Proč si vybrat nás', value: 'why-choose-us'},
          {title: 'Nadstandardní servis', value: 'service-benefits'},
          {title: 'Kroky', value: 'process-steps'},
        ],
      },
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
  ],
  orderings: [
    {
      title: 'Pořadí',
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
