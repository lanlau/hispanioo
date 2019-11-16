export default {
    name: 'qcm',
    type: 'object',
    title: 'Mutiple choice question',

    fields: [
      {
          title:'title',
          name:'title',
          type:'string'
      },

      {
        name: 'image',
        type: 'image',
        title: 'image',
        options:{
          collapsible:true,
          collapsed:true
        }
      },

      {
        title: 'options',
        name: 'options',
        type: 'array',
        of: [
            {type: 'choice'}
        ]
      }      
    ],
    preview: {
        select: {
            title: 'title',
            code:'_type'
          },
          prepare ({title = 'No title',  code}) {
  
            return {
              title,
              subtitle: code
            }
          }
      }     
  }
  