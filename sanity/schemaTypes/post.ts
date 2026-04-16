import { defineField, defineType } from 'sanity';
import { apiVersion } from '@/sanity/env';
import {
  createResponsiveImageInput,
  type CropConfig,
} from '@/sanity/components/ResponsiveImageInput';
import { deviceCropsField } from '@/sanity/fields/deviceCrops';

const BLOG_IMAGE_CROPS: CropConfig[] = [
  { key: 'card', label: 'Karta', ratio: '4:3', aspect: 4 / 3 },
  { key: 'hero', label: 'Hero', ratio: '3:2', aspect: 3 / 2 },
];

export default defineType({
  name: 'post',
  title: 'Článek',
  type: 'document',
  groups: [
    { name: 'content', title: 'Obsah', default: true },
    { name: 'media', title: 'Média' },
    { name: 'meta', title: 'Meta' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Nadpis H1',
      description: 'Obecný nadpis článku',
      type: 'string',
      group: 'content',
      validation: (rule) => [
        rule.required().error('Nadpis je povinný'),
        rule.min(20).warning('Nadpis by měl mít alespoň 20 znaků'),
        rule.max(70).warning('Nadpis by neměl přesáhnout 70 znaků'),
      ],
    }),
    defineField({
      name: 'subtitle',
      title: 'Podnadpis H2',
      description: 'Specifický nadpis článku',
      type: 'string',
      group: 'content',
      validation: (rule) => [
        rule.required().error('Podnadpis je povinný'),
        rule.min(20).warning('Podnadpis by měl mít alespoň 20 znaků'),
        rule.max(70).warning('Podnadpis by neměl přesáhnout 70 znaků'),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      description: 'Generuje se z Podnadpis H2',
      type: 'slug',
      group: 'seo',
      options: {
        source: 'subtitle',
        maxLength: 96,
      },
      validation: (rule) =>
        rule.required().custom(async (slug, context) => {
          if (!slug?.current) {
            return 'Slug je povinný';
          }
          const client = context.getClient({ apiVersion });
          const id = context.document?._id?.replace(/^drafts\./, '');
          const count = await client.fetch(
            `count(*[_type == "post" && slug.current == $slug && !(_id in [$id, $draftId])])`,
            { slug: slug.current, id, draftId: `drafts.${id}` },
          );
          return count > 0 ? 'Tento slug již existuje, zvolte jiný' : true;
        }),
    }),
    defineField({
      name: 'excerpt',
      title: 'Úvod',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'readingTime',
      title: 'Přečteno za (minut)',
      type: 'number',
      group: 'content',
      initialValue: 5,
    }),
    defineField({
      name: 'mainImage',
      title: 'Hlavní obrázek',
      description: 'Doporučeno min. 1200x630px pro optimální zobrazení na sociálních sítích.',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [deviceCropsField],
      components: {
        input: createResponsiveImageInput(BLOG_IMAGE_CROPS),
      },
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: { type: 'author' },
      group: 'meta',
    }),
    defineField({
      name: 'categories',
      title: 'Kategorie',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      group: 'meta',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Datum publikace',
      type: 'datetime',
      group: 'meta',
    }),
    defineField({
      name: 'featured',
      title: 'Zobrazit jako nejnovější články',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta nadpis',
          description: 'Doporučeno 30–70 znaků',
          type: 'string',
          validation: (rule) => [
            rule.max(70).warning('Meta nadpis by neměl přesáhnout 70 znaků'),
            rule.min(30).warning('Meta nadpis by měl mít alespoň 30 znaků'),
          ],
        },
        {
          name: 'metaDescription',
          title: 'Meta popis',
          description: 'Doporučeno 70–150 znaků',
          type: 'text',
          rows: 3,
          validation: (rule) => [
            rule.max(150).warning('Meta popis by neměl přesáhnout 150 znaků'),
            rule
              .min(120)
              .warning('Meta popis by měl mít alespoň 120 znaků (Google doporučuje 120-160)'),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare({ title, subtitle, author, media }) {
      return {
        title,
        subtitle: [subtitle, author].filter(Boolean).join(' / '),
        media,
      };
    },
  },
});
