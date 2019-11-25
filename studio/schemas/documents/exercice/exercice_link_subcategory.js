export default {
    name: 'exercice_link_subcategory',
    type: 'document',
    title: 'Link between sub categories & exercices',

    fields: [
      {
          name:'subcategory',
          type:'reference',
          title: 'sub category',
          to:[{type:'exercice_subcategory'}],
      },
      {
        name:'exercices',
        type:'array',
        of:[{type:'reference',to:[{type:'exercice'}]}]
      }      
    ],
    preview: {
      select: {
        title: 'subcategory.title'
      }    
    }
  }
  