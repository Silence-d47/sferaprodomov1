import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'employee',
  title: 'Zaměstnanec',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Jméno a příjmení',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Pozice',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Fotografie',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      description: 'Telefonní číslo ve formátu +420 XXX XXX XXX',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'isDirector',
      title: 'Jednatel společnosti',
      type: 'boolean',
      initialValue: false,
      description: 'Zaškrtněte, pokud je zaměstnanec jednatelem společnosti',
    }),
    defineField({
      name: 'order',
      title: 'Pořadí zobrazení',
      type: 'number',
      initialValue: 0,
      description: 'Čím menší číslo, tím dříve se zobrazí (0 = první)',
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivní zaměstnanec',
      type: 'boolean',
      initialValue: true,
      description: 'Zaškrtněte, pokud je zaměstnanec stále aktivní',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title,
        subtitle: subtitle,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Pořadí zobrazení',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Jméno A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
})
