export default {
    name: 'exercice_tag',
    type: 'document',
    title: 'Exercice Tag',
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
  