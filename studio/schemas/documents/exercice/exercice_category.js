export default {
    name: 'exercice_category',
    type: 'document',
    title: 'Exercice Category',
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
        }
      }
    ]
  }
  