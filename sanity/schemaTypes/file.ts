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
      title: 'File Type',
      type: 'string',
      options: {
        list: [
          {title: 'Product Datasheet', value: 'datasheet'},
          {title: 'Installation Manual', value: 'manual'},
          {title: 'Catalog', value: 'catalog'},
          {title: 'Certificate', value: 'certificate'},
          {title: 'Technical Specification', value: 'specification'},
          {title: 'Warranty Document', value: 'warranty'},
          {title: 'Other', value: 'other'},
        ],
      },
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
          {title: 'General', value: 'general'},
        ],
      },
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'Czech', value: 'cs'},
          {title: 'English', value: 'en'},
          {title: 'German', value: 'de'},
          {title: 'Slovak', value: 'sk'},
        ],
      },
      initialValue: 'cs',
    }),
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
    }),
    defineField({
      name: 'uploadDate',
      title: 'Upload Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'isPublic',
      title: 'Public Download',
      type: 'boolean',
      initialValue: true,
      description: 'Allow public download without registration',
    }),
    defineField({
      name: 'downloadCount',
      title: 'Download Count',
      type: 'number',
      initialValue: 0,
      readOnly: true,
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
