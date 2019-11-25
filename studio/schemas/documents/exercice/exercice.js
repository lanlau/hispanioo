import {format} from 'date-fns'

export default {
  name: 'exercice',
  type: 'document',
  title: 'Exercice',
  initialValue:()=>({
    sticky:false,
    publishedAt:(new Date()).toISOString()

  }),
  fieldsets:[
    {name: 'content', title:'Content',options:{collapsible: true, collapsed: false}}, 
    {name: 'list', title:'Apparence dans listes',options:{collapsible: true, collapsed: true}}, 
    {name: 'instruction', title:'Page d\'instruction',options:{collapsible: true, collapsed: true}}, 
    {name: 'questions', title:'Questions',options:{collapsible: true, collapsed: true}}, 
    {name: 'publishingOptions', title:'Publishing date,  tags et PRIVE',options:{collapsible: true, collapsed: true}},
    {name: 'links', title: 'Linked to',options:{collapsible: true, collapsed: true}},
    {name: 'results', title: 'Messages sur écran résultats',options:{collapsible: true, collapsed: true}}
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      fieldset:'content',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Friendly URL',
      fieldset:'content',
      options: {
        source: 'title',
        maxLength: 200
      }
    },
    {
      name: 'sticky',
      type: 'boolean',
      fieldset:'list',
      title: 'Promu en haut de liste',
      description: 'Cet exercice apparaîtra en haut des listes',
    },      
    {
      name:'description', 
      type:'text',
      title:'Description de l\'exercice',
      fieldset:'list',
      description:'Apparaîtra dans les listes mais pas dans l\'exercice',
    },   
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      fieldset:'publishingOptions',
      description: 'This can be used to schedule post for publishing',
      validation: Rule => Rule.required()
  },
  {
    name: 'tags',
    type: 'array',
    title: 'Tags',
    fieldset:'publishingOptions',
    of: [
      {
        type: 'reference',
        to: {
          type: 'exercice_tag'
        }
      }
    ]       
  }, 
  {
    name: 'private',
    type: 'string',
    title: 'Exercice Protected by password',
    fieldset:'publishingOptions',
    description:'Si non vide, alors exercice non visible dans les listes et uniquement accéssible via un lien et protégé par mot de passe',
},    
    {
        name: 'instruction',
        type: 'bodyPortableText',
        title: 'Instruction',
        fieldset:'instruction',
        description:'Ajouter une instruction créé une page d\'intro pour l\'exercice avant d\'accéder aux questions',
    },

    {
        title: 'Questions',
        name: 'questions',
        type: 'array',
        fieldset:'questions',
        of: [
            {type: 'qcs'},
            {type: 'qcm'},
            {type: 'fillInTheBlanks'}
        ]
    },
    {
      title:'Message Résultat 0-25%',
      name:'resultMessage025',
      fieldset:'exercices',
      description:'Message affiché quand résultats entre >=0 et <25%',
      type:'bodyPortableText'
    },
    {
      title:'Message Résultat 25-50%',
      name:'resultMessage2550',
      fieldset:'exercices',
      description:'Message affiché quand résultats entre >=25 et <50%',
      type:'bodyPortableText'
    },
    {
      title:'Message Résultat 50-75%',
      name:'resultMessage5075',
      fieldset:'exercices',
      description:'Message affiché quand résultats entre >=50 et <75%',
      type:'bodyPortableText'
    },
    {
      title:'Message Résultat 75-100%',
      name:'resultMessage75100',
      fieldset:'exercices',
      description:'Message affiché quand résultats entre >=75 et <100%',
      type:'bodyPortableText'
    } ,
    {
      title:'Message Résultat 100%',
      name:'resultMessage100',
      fieldset:'exercices',
      description:'Message affiché quand résultats =100%',
      type:'bodyPortableText'
    }           
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug'
    },
    prepare ({title = 'No title', publishedAt, slug}) {
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/${dateSegment}/${slug.current}/`
      return {
        title,
        subtitle: publishedAt ? path : 'Missing publishing date'
      }
    }
  }
}
