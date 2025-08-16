import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'brand',
  title: 'Značka',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název značky',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    // Zde můžeš v budoucnu přidat třeba logo značky atd.
    // defineField({
    //   name: 'logo',
    //   title: 'Logo',
    //   type: 'image',
    // }),
  ],
})