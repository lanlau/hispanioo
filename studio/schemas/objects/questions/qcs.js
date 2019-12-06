export default {
    name: 'qcs',
    type: 'object',
    title: 'Single choice question',

    fields: [
      {
          title:'title',
          name:'title',
          description:'Uniquement utilisé dans le backoffice',
          type:'string'
      },
      {
        name: 'instruction',
        type: 'bodyPortableText',
        description:'Apparaît en haut de la question, peut contenir la question en elle-même et/ou une instruction',
        title: 'Instruction',
        validation: Rule => Rule.required()
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
  