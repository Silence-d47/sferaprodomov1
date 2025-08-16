import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'fileAsset',
  title: 'File Asset',
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
      rows: 3,
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar',
      },
    }),
    defineField({
      name: 'fileType',
      title: 'Typ souboru',
      type: 'string',
      options: {
        list: [
          {title: 'Datasheet', value: 'datasheet'},
          {title: 'Návod k instalaci', value: 'manual'},
          {title: 'Katalog', value: 'catalog'},
          {title: 'Certifikát', value: 'certificate'},
          {title: 'Technický list', value: 'specification'},
          {title: 'Záruční list', value: 'warranty'},
          {title: 'Jiné', value: 'other'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'fileType',
      media: 'file',
    },
  },
})
