export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fieldsets:[
    {name: 'global', title:'Paramètres globaux',options:{collapsible: true, collapsed: true}}, 
    {name: 'home', title:'Page d\'accueil',options:{collapsible: true, collapsed: true}}, 
    {name: 'blog', title:'Blog, catégories & tags',options:{collapsible: true, collapsed: true}}, 
    {name: 'exercices', title:'Exercices, catégories & tags',options:{collapsible: true, collapsed: true}}, 
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      fieldset:'global'
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Sub Title',
      fieldset:'global'
    },

    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Uniquement utilisée pour SEO',
      fieldset:'global'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Mots clés utilisés pour SEO',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      fieldset:'global'
    },
    {
      name: 'homeHeroImage',
      type: 'image',
      title: 'Home hero image',
      fieldset:'home',
      description: 'Image utilisée sur la page d\'accueil'
    }, 
    {
      name: 'homePosts',
      title:'Home nombre posts affichés',
      type:'number',
      fieldset:'home',
      description:'Nombre de posts sur la page d\'accueil'
    },    
    {
      name: 'blogPostsPerPage',
      title:'Blog nombre posts per page',
      type:'number',
      fieldset:'blog',
      description:'Nombre de posts par page'
    },
    {
      name: 'defaultImage',
      type: 'image',
      fieldset:'global',
      title: 'Blog post ou page image par défaut',
      description: 'Image par défaut utilisée pour les posts et pages si aucune trouvée'
    },   
    {
      name: 'topmenu_pages',
      type: 'array',
      title: 'Pages du menu principal',
      fieldset:'global',
      description: 'Pages qui apparaitront dans le menu principal',
      of: [
        {
          type: 'reference',
          to: {
            type: 'page'
          }
        }
      ]
    },
    {
      name: 'home_pages',
      type: 'array',
      title: 'Home pages',
      fieldset:'home',
      description: 'Pages qui apparaitront sur la page d\'accueil',
      of: [
        {
          type: 'reference',
          to: {
            type: 'page'
          }
        }
      ]
    },
    {
      name: 'exercicesPerPage',
      title:'Nombre exercices par page',
      type:'number',
      fieldset:'exercices',
      description:'Nombre d\'exercices par page'
    },
    {
      title:'Exercice result messages',
      name:'resultMessages',
      description:'Messages qui apparaîtront dans l\'écran de résultats des exercices. Attention l\'ordre est primordial',
      fieldset:'exercices',
      type:'array',
      of:[{
        title:'message',
        name:'message',
        type:'object',
        fields:[
          {
            title:'score',
            name:'score',
            description:'ce message apparaîtra si le score est inférieur à cette valeur',
            type:'number'
          },
          {
            title:'isEqual',
            name:'isEqual',
            description:'ce message apparaîtra si le score est égal à cette valeur',
            type:'boolean'
          },
          {
            title:'texte',
            name:'texte',
            description:'ce message affichera ce texte',
            type:'bodyPortableText'
          }
        ]
      }]

    }      
  ]
}
