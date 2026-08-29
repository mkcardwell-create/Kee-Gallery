import { defineField, defineType } from 'sanity'

export const dropType = defineType({
  name: 'drop',
  title: '$1 More Drops',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Print title',
      type: 'string',
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
      name: 'rollNumber',
      title: 'Roll / frame reference',
      type: 'string',
    }),
    defineField({
      name: 'format',
      title: 'Print format',
      type: 'string',
      initialValue: '8×10',
    }),
    defineField({
      name: 'paper',
      title: 'Paper',
      type: 'string',
      initialValue: 'Baryta 315gsm',
    }),
    defineField({
      name: 'signed',
      title: 'Signed',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'shipsWithin',
      title: 'Ships within',
      type: 'string',
      initialValue: '2 weeks',
    }),
    defineField({
      name: 'order',
      title: 'Order in drop sequence',
      type: 'number',
    }),
    defineField({
      name: 'sold',
      title: 'Sold',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Drop sequence',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})