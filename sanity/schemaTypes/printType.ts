import { defineField, defineType } from 'sanity'

export const printType = defineType({
  name: 'print',
  title: 'Print Shop',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (e.g. From $85)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'editionType',
      title: 'Edition type',
      type: 'string',
      options: {
        list: [
          { title: 'Open edition', value: 'open' },
          { title: 'Limited edition', value: 'limited' },
        ],
        layout: 'radio',
      },
      initialValue: 'open',
    }),
    defineField({
      name: 'editionSize',
      title: 'Edition size (if limited)',
      type: 'number',
    }),
    defineField({
      name: 'editionRemaining',
      title: 'Remaining (if limited)',
      type: 'number',
    }),
    defineField({
      name: 'camera',
      title: 'Camera',
      type: 'string',
    }),
    defineField({
      name: 'film',
      title: 'Film stock',
      type: 'string',
    }),
    defineField({
      name: 'paper',
      title: 'Paper',
      type: 'string',
      initialValue: 'Baryta 315gsm',
    }),
    defineField({
      name: 'format',
      title: 'Available formats',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Featured in print shop',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})