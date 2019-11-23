export default {
    name: 'fillInTheBlanks',
    type: 'object',
    title: 'Fill in the blanks',

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
        name: 'body',
        type: 'fillInTheBlanksPortableText',
        title: 'Body',
        validation: Rule => Rule.required()
    }],
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
  