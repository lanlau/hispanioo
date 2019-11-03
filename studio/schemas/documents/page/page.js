export default {
    name: 'page',
    type: 'document',
    title: 'Page',
    fieldsets:[
      {name: 'content', title:'Content',options:{collapsible: true, collapsed: false}}, 
      {name: 'menu', title:'MenuOptions',options:{collapsible: true, collapsed: true}}, 
    ],
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        fieldset:"content"
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description: 'Some frontends will require a slug to be set to be able to show the person',
        options: {
          source: 'title',
          maxLength: 96
        },
        fieldset: 'content'
      },
      {
        name: 'content',
        type: 'bodyPortableText',
        title: 'Content',
        fieldset:'content'
      }, 
      {
          name:'parent',
          type:'reference',
          title: 'Parent Page',
          to:[{type:'page'}],
          fieldset:'content'
      },
      {
        name:'description', 
        type:'text',
        title:'Description of the page',
        description:'Used in website homepage',
        fieldset:'menu'
      },
      {
        name:'image', 
        type:'image',
        title:'Image',
        description:'Used in website homepage',
        fieldset:'menu'        
      }

    ],
    preview: {
      select: {
        title: 'title',
        media: 'image'
      }
    }
  }
  