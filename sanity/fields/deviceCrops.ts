import { defineField } from 'sanity';

const cropFields = [
  { name: 'x', title: 'X', type: 'number' as const },
  { name: 'y', title: 'Y', type: 'number' as const },
  { name: 'width', title: 'Width', type: 'number' as const },
  { name: 'height', title: 'Height', type: 'number' as const },
];

export const deviceCropsField = defineField({
  name: 'deviceCrops',
  title: 'Ořezy pro zařízení',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'desktop',
      title: 'Desktop',
      type: 'object',
      fields: cropFields,
    },
    {
      name: 'tablet',
      title: 'Tablet',
      type: 'object',
      fields: cropFields,
    },
    {
      name: 'mobile',
      title: 'Mobile',
      type: 'object',
      fields: cropFields,
    },
  ],
});
