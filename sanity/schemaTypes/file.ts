import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'fileAsset',
  title: 'Soubory',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Popis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'file',
      title: 'Soubor (pdf, doc, docx, xls, xlsx, ppt, pptx, zip, rar)',
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
          {title: 'Datový list modelu', value: 'datasheet'},
          {title: 'Návod k instalaci', value: 'manual'},
          {title: 'Katalog', value: 'catalog'},
          {title: 'Certifikát', value: 'certificate'},
          {title: 'Technické údaje', value: 'specification'},
          {title: 'Záruční list', value: 'warranty'},
          {title: 'Ostatní', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
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
      title: 'Jazyk',
      type: 'string',
      options: {
        list: [
          {title: 'Česky', value: 'cs'},
          {title: 'English', value: 'en'},
          {title: 'German', value: 'de'},
          {title: 'Slovak', value: 'sk'},
        ],
      },
      initialValue: 'cs',
    }),
    defineField({
      name: 'version',
      title: 'Verze',
      type: 'string',
    }),
    defineField({
      name: 'uploadDate',
      title: 'datum nahrátí',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'isPublic',
      title: 'Ke stažení pro veřejnost?',
      type: 'boolean',
      initialValue: true,
      description: 'Povolí veřejné stažení bez nutnosti registrace nebo žádosti adminovi',
    }),
    defineField({
      name: 'downloadCount',
      title: 'Počet stažení',
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
