export default {
    name: 'blog_category',
    type: 'document',
    title: 'Blog Category',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title'
      }, 
      {
        name: 'slug',
        type: 'slug',
        title: 'Friendly URL',
        options: {
          source: 'title',
          maxLength: 200
        },
      }
    ]
  }
  