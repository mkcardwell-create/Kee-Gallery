import { defineField, defineType } from 'sanity'

export const keeEditionType = defineType({
  name: 'keeEdition',
  title: 'Kee Edition',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'month',
      title: 'Month (e.g. July 2025)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Photographer quote',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'camera',
      title: 'Camera',
      type: 'string',
    }),
    defineField({
      name: 'lens',
      title: 'Lens',
      type: 'string',
    }),
    defineField({
      name: 'film',
      title: 'Film stock',
      type: 'string',
    }),
    defineField({
      name: 'developed',
      title: 'Development notes',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'format',
      title: 'Print format',
      type: 'string',
    }),
    defineField({
      name: 'paper',
      title: 'Paper',
      type: 'string',
      initialValue: 'Baryta 315gsm · Signed',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      initialValue: 380,
    }),
    defineField({
      name: 'editionSize',
      title: 'Edition size',
      type: 'number',
      initialValue: 10,
    }),
    defineField({
      name: 'editionRemaining',
      title: 'Remaining',
      type: 'number',
    }),
    defineField({
      name: 'secondEditionSize',
      title: 'Second edition size (if sells out)',
      type: 'number',
      initialValue: 25,
    }),
    defineField({
      name: 'active',
      title: 'Currently active edition',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'photographerBio',
      title: 'Photographer bio',
      type: 'text',
      rows: 3,
    }),
  ],
})