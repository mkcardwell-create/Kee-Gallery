import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Projects',
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
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Project images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
            defineField({
              name: 'photographer',
              title: 'Photographer',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'contributors',
      title: 'Contributors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'artist' }],
        },
      ],
    }),
    defineField({
      name: 'photoCount',
      title: 'Number of photographs',
      type: 'number',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on projects page',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'openForSubmissions',
      title: 'Open for submissions',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})