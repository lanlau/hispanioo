export default {
    name: 'blog_tag',
    type: 'document',
    title: 'Blog Tag',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name'
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Friendly URL',
        options: {
          source: 'name',
          maxLength: 200
        }
      }      
    ]
  }
  