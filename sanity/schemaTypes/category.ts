import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Kategorie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Popis',
      type: 'text',
    }),
    defineField({
      name: 'color',
      title: 'Barva',
      type: 'string',
      options: {
        list: [
          {title: 'Modrá', value: 'blue'},
          {title: 'Zelená', value: 'green'},
          {title: 'Fialová', value: 'purple'},
          {title: 'Oranžová', value: 'orange'},
          {title: 'Červená', value: 'red'},
          {title: 'Žlutá', value: 'yellow'},
        ],
      },
    }),
  ],
})
