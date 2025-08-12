import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Nastavení stránky',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název stránky',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Popis stránky',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'contact',
      title: 'Kontaktní informace',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Telefon',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Addresa',
          type: 'text',
          rows: 3,
        },
        {
          name: 'openingHours',
          title: 'Otevírací doba',
          type: 'text',
          rows: 4,
        },
      ],
    }),
    defineField({
      name: 'social',
      title: 'Socialní sítě',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'ratings',
      title: 'Hodnocení společnosti',
      type: 'object',
      fields: [
        {
          name: 'googleRating',
          title: 'Google hodnocení',
          type: 'number',
          validation: Rule => Rule.min(1).max(5),
        },
        {
          name: 'googleReviews',
          title: 'Počet Google hodnocení',
          type: 'number',
        },
        {
          name: 'seznamRating',
          title: 'Seznam.cz hodnocení',
          type: 'number',
          validation: Rule => Rule.min(1).max(5),
        },
        {
          name: 'seznamReviews',
          title: 'Počet hodnocení na Seznam.cz',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'companyInfo',
      title: 'Informace o společnosti',
      type: 'object',
      fields: [
        {
          name: 'companyName',
          title: 'Jméno společnosti',
          type: 'string',
        },
        {
          name: 'ico',
          title: 'IČO',
          type: 'string',
        },
        {
          name: 'dic',
          title: 'DIČ',
          type: 'string',
        },
        {
          name: 'foundedYear',
          title: 'Založeno',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Základní nastavení SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Základní Meta název',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Základní Meta popis',
          type: 'text',
          rows: 3,
        },
        {
          name: 'ogImage',
          title: 'Default OG obrázek',
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analýza a sledování',
      type: 'object',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
        },
        {
          name: 'facebookPixelId',
          title: 'Facebook Pixel ID',
          type: 'string',
        },
        {
          name: 'gtmId',
          title: 'Google Tag Manager ID',
          type: 'string',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
  },
})
