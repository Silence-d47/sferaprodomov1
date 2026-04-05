import { defineType, defineArrayMember } from 'sanity'

export default defineType({
  title: 'Text',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Blok',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Citace', value: 'blockquote' },
      ],
      lists: [{ title: 'Seznam', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Tučný', value: 'strong' },
          { title: 'Kurzíva', value: 'em' },
        ],
        annotations: [
          {
            title: 'Odkaz',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'Odkaz',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
    }),
    defineArrayMember({
      name: 'youtube',
      title: 'YouTube video',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'YouTube URL',
          description: 'Vložte odkaz na YouTube video (např. https://www.youtube.com/watch?v=...)',
          type: 'url',
          validation: (rule) =>
            rule
              .required()
              .uri({ scheme: ['https'] })
              .custom((url: string | undefined) => {
                if (!url) {
                  return true
                }
                const pattern = /^https:\/\/(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)/
                return pattern.test(url) || 'Zadejte platný YouTube odkaz'
              }),
        },
        {
          name: 'posterImage',
          title: 'Náhledový obrázek',
          description: 'Volitelný vlastní náhled místo výchozího z YouTube',
          type: 'image',
          options: { hotspot: true },
        },
      ],
      preview: {
        select: { url: 'url' },
        prepare({ url }) {
          return { title: 'YouTube video', subtitle: url }
        },
      },
    }),
  ],
})
