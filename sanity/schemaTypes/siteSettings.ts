import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
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
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3,
        },
        {
          name: 'openingHours',
          title: 'Opening Hours',
          type: 'text',
          rows: 4,
        },
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social Media',
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
      title: 'Company Ratings',
      type: 'object',
      fields: [
        {
          name: 'googleRating',
          title: 'Google Rating',
          type: 'number',
          validation: Rule => Rule.min(1).max(5),
        },
        {
          name: 'googleReviews',
          title: 'Number of Google Reviews',
          type: 'number',
        },
        {
          name: 'seznamRating',
          title: 'Seznam.cz Rating',
          type: 'number',
          validation: Rule => Rule.min(1).max(5),
        },
        {
          name: 'seznamReviews',
          title: 'Number of Seznam Reviews',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'companyInfo',
      title: 'Company Information',
      type: 'object',
      fields: [
        {
          name: 'companyName',
          title: 'Company Name',
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
          title: 'Founded Year',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'ogImage',
          title: 'Default OG Image',
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics & Tracking',
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
