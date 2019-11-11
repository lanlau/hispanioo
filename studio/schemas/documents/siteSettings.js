export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Sub Title'
    },

    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Uniquement utilisée pour SEO'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Mots clés utilisés pour SEO',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'homeHeroImage',
      type: 'image',
      title: 'Home hero image',
      description: 'Image utilisée sur la page d\'accueil'
    }, 
    {
      name: 'homePosts',
      title:'Home nombre posts affichés',
      type:'number',
      description:'Nombre de posts sur la page d\'accueil'
    },    
    {
      name: 'blogPostsPerPage',
      title:'Blog nombre posts per page',
      type:'number',
      description:'Nombre de posts par page'
    },
    {
      name: 'defaultImage',
      type: 'image',
      title: 'Blog post ou page image par défaut',
      description: 'Image par défaut utilisée pour les posts et pages si aucune trouvée'
    },    

  ]
}
