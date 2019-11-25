export default {
    name: 'exercice_subcategory',
    type: 'document',
    title: 'Exercice Sub Category',
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
  