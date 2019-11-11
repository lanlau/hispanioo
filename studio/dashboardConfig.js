export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-blog'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5dbd8d850625a5902d621d3f',
                  title: 'Sanity Studio',
                  name: 'Hispanioo-studio',
                  apiId: '4232dc43-8c3d-4a78-94ec-a90efb5a8441'
                },
                {
                  buildHookId: '5dbd8d854635ae7fb324ecc7',
                  title: 'Blog Website',
                  name: 'Hispanioo',
                  apiId: '31dbff98-2bd6-44f1-b567-8c806bb8daeb'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/lanlau/Hispanioo',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://Hispanioo.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['blog_post']},
      layout: {width: 'medium'}
    }
  ]
}
