import { defineField, defineType } from 'sanity'

export const dispatchType = defineType({
  name: 'dispatch',
  title: 'Dispatch',
  type: 'document',
  fields: [
    defineField({
      name: 'thought',
      title: 'Thought',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
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
      name: 'imageOrientation',
      title: 'Image orientation',
      type: 'string',
      options: {
        list: [
          { title: 'Landscape', value: 'landscape' },
          { title: 'Portrait', value: 'portrait' },
        ],
        layout: 'radio',
      },
      initialValue: 'landscape',
    }),
    defineField({
      name: 'printAvailable',
      title: 'Print available',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Date, newest first',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
})