export default {
    name: 'choice',
    type: 'object',
    title: 'choice',
    initialValues:{
        isCorrect:false
    },
    fields: [
      {
        title: 'text',
        name: 'text',
        type: 'string'
      }, 
      {
        title: 'isCorrect',
        name: 'isCorrect',
        type: 'boolean'
      },            
    ],
    preview: {
        select: {
            title: 'text',
            isCorrect: 'isCorrect'
          },
          prepare ({title = 'No title',  isCorrect}) {
  
            return {
              title,
              subtitle: isCorrect.toString()
            }
          }
      }    
  }
  