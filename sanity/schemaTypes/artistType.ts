import { defineField, defineType } from 'sanity'

export const artistType = defineType({
  name: 'artist',
  title: 'Artists',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Co-Founder', value: 'cofounder' },
          { title: 'Guest Contributor', value: 'contributor' },
          { title: 'Featured Artist', value: 'featured' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'discipline',
      title: 'Discipline (e.g. Portrait, Street, Landscape)',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'printsAvailable',
      title: 'Prints available',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'printCount',
      title: 'Number of prints available',
      type: 'number',
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})