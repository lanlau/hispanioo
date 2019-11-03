import {format} from 'date-fns'

export default {
  name: 'blog_post',
  type: 'document',
  title: 'Blog Post',
  fieldsets:[
    {name: 'content', title:'Content',options:{collapsible: true, collapsed: false}}, 
    {name: 'image', title:'Image',options:{collapsible: true, collapsed: true}}, 
    {name: 'text', title:'text',options:{collapsible: true, collapsed: true}}, 
    {name: 'publishingOption', title:'Publishing Options',options:{collapsible: true, collapsed: true}},
    {name: 'links', title: 'Linked to',options:{collapsible: true, collapsed: true}}
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      fieldset: 'content', 
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Friendly URL',
      options: {
        source: 'title',
        maxLength: 200
      },
      fieldset: 'content'
    },

    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main image',
      fieldset:'image',
      options:{
        collapsible:true,
        collapsed:true
      }
    },
  
    {
      name: 'excerpt',
      type: 'excerptPortableText',
      title: 'Excerpt',
      fieldset:'text',
      validation: Rule => Rule.required()
    },
    {
        name: 'body',
        type: 'bodyPortableText',
        title: 'Body',
        fieldset:'text',
        validation: Rule => Rule.required()
    }, 
    
    {
        name: 'publishedAt',
        type: 'datetime',
        title: 'Published at',
        description: 'This can be used to schedule post for publishing',
        fieldset:'publishingOption',
        validation: Rule => Rule.required()
      },      
    {
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: 
        [{
          type: 'author'
        }]
      ,
      fieldset:'links',
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
            type: 'blog_category'
          }
        }
      ],
      fieldset:'links',
      validation: Rule => Rule.required()
    },{
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [
        {
          type: 'reference',
          to: {
            type: 'blog_tag'
          }
        }
      ],
      fieldset:'links'          
    }
  ],
  orderings: [ 
      {
        name: 'byTitleAsc',
        title: 'by Title asc',
        by: [
          {
            field: 'title',
            direction: 'asc'
          }
        ]          
      },
      {
        name: 'byTitleDesc',
        title: 'by Title desc',
        by: [
          {
            field: 'title',
            direction: 'desc'
          }
        ]          
      },      
      
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
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
