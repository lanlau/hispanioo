import {format} from 'date-fns'

export default {
  name: 'exercice',
  type: 'document',
  title: 'Exercice',

  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Friendly URL',
      options: {
        source: 'title',
        maxLength: 200
      }
    },
    {
        name: 'body',
        type: 'bodyPortableText',
        title: 'Body',

        validation: Rule => Rule.required()
    },
    {
        name: 'mainImage',
        type: 'mainImage',
        title: 'Main image',

        options:{
          collapsible:true,
          collapsed:true
        }
    },

    {
        name: 'publishedAt',
        type: 'datetime',
        title: 'Published at',
        description: 'This can be used to schedule post for publishing',
        validation: Rule => Rule.required()
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Catégories',
      of: [
        {
          type: 'reference',
          to: {
            type: 'exercice_category'
          }
        }
      ],
      validation: Rule => Rule.required()
    },{
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [
        {
          type: 'reference',
          to: {
            type: 'exercice_tag'
          }
        }
      ]       
    },
    {
        title: 'questions',
        name: 'questions',
        type: 'array',
        of: [
            {type: 'qcs'},
            {type: 'qcm'},
            {type: 'fillInTheBlanks'}
        ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'mainImage'
    },
    prepare ({title = 'No title', publishedAt, slug, media}) {
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/${dateSegment}/${slug.current}/`
      return {
        title,
        media,
        subtitle: publishedAt ? path : 'Missing publishing date'
      }
    }
  }
}
