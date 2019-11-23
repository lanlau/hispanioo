export default {
    name: 'outsideImage',
    type: 'image',
    title: 'Outside Image old hispanioo',
    fields: [
      {
        name: 'alt',
        type: 'string',
        title: 'Alternative text',
        description: 'Important for SEO and accessiblity.',
      },
      {
        name: 'src',
        type: 'string',
        title: 'link to image',        
      }
    ],
    preview: {
      select: {
        imageUrl: 'src',
        title: 'alt'
      }
    }
  }
  