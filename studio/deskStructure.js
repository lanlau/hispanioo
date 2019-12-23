import S from '@sanity/desk-tool/structure-builder'
import MdSettings from 'react-icons/lib/md/settings'
import MdPerson from 'react-icons/lib/md/person'
import MdLibraryBooks from 'react-icons/lib/md/library-books'
import MdFilterList from 'react-icons/lib/md/filter-list'
import FaHashtag from 'react-icons/lib/fa/hashtag'

const hiddenDocTypes = listItem =>
  !['blog_tag', 'blog_category', 'blog_post', 'siteSettings', 'page', 'author'].includes(
    listItem.getId()
  )

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('By Categories')
                .showIcon(false),
              S.divider(),
              S.listItem()
                .title('Blog posts by Categories')
                .icon(MdFilterList)
                .child(
                  S.documentList()
                    .title('Blog Category')
                    .menuItems(S.documentTypeList('blog_category').getMenuItems())
                    .filter('_type == $type')
                    .params({ type: 'blog_category' })
                    .child(categoryId =>
                      S.documentList()
                        .title('Blog in this category')

                        .schemaType('blog_post')
                        .menuItems(S.documentTypeList('blog_post').getMenuItems())
                        .filter('_type == $type && $categoryId in categories[]._ref')
                        .params({ type: 'blog_post', categoryId })
                        .initialValueTemplates([
                          S.initialValueTemplateItem('post-category', { categoryId })
                        ])
                    )
                ),
              S.listItem()
                .title('Blog posts with NO categories')
                .icon(MdFilterList)
                .child(
                  S.documentList()
                    .title('List of Blog posts with NO Categories')
                    .schemaType('blog_post')
                    .menuItems(S.documentTypeList('blog_post').getMenuItems())
                    .filter('_type == "blog_post" && !defined(categories)')
                ),

              S.listItem()
                .title('Categories')
                .schemaType('blog_category')
                .child(S.documentTypeList('blog_category').title('Categories')),

              S.listItem()
                .title('By Tags')
                .showIcon(false),
              S.divider(),
              //Tags
              S.listItem()
                .title('Blog posts by Tags')
                .icon(MdFilterList)

                .child(
                  S.documentList()
                    .title('Tags')
                    .menuItems(S.documentTypeList('blog_tag').getMenuItems())
                    .filter('_type == $type')
                    .params({ type: 'blog_tag' })
                    .child(tagId =>
                      S.documentList()
                        .title('Blog in this tag')
                        .schemaType('blog_post')
                        .menuItems(S.documentTypeList('blog_post').getMenuItems())

                        .filter('_type == $type && $tagId in tags[]._ref')
                        .params({ type: 'blog_post', tagId })
                        .initialValueTemplates([S.initialValueTemplateItem('post-tag', { tagId })])
                    )
                ),
              S.listItem()
                .title('Blog posts with NO tags')
                .icon(MdFilterList)
                .child(
                  S.documentList()
                    .title('List of Blog posts with NO Tags')
                    .schemaType('blog_post')

                    .menuItems(S.documentTypeList('blog_post').getMenuItems())
                    .filter('_type == "blog_post" && !defined(tags)')
                ),

              S.listItem()
                .title('Tags')
                .icon(FaHashtag)
                .schemaType('blog_tag')
                .child(S.documentTypeList('blog_tag').title('Tags')),

              S.listItem()
                .title('By Publication date')
                .showIcon(false),
              S.divider(),

              S.listItem()
                .title('Blog posts')
                .icon(MdFilterList)
                .schemaType('blog_post')
                .child(S.documentTypeList('blog_post').title('Blog Posts'))
            ])
          //
          //
        ),
      ////////// PAGES
      S.listItem()
        .title('Pages')
        .icon(MdLibraryBooks)
        .child(
          S.list()
            .title('Pages')
            .items([
              ////
              S.listItem()
                .title('By pages')
                .showIcon(false),
              S.divider(),
              S.listItem()
                .title('Top level Pages')
                .icon(MdFilterList)
                .child(
                  S.documentList()
                    .title('List of pages')
                    .schemaType('page')
                    .menuItems(S.documentTypeList('page').getMenuItems())
                    .filter('_type == "page" && !defined(parent)')
                    .child(pageId =>
                      S.documentList()
                        .title('Pages under')
                        .schemaType('page')
                        .menuItems(S.documentTypeList('page').getMenuItems())

                        .filter('_type == $type && $pageId == parent._ref')
                        .params({ type: 'page', pageId })
                    )
                ),
              S.listItem()
                .title('All Pages')
                .icon(MdFilterList)
                .child(
                  S.documentList()
                    .title('List of pages')
                    .schemaType('page')
                    .menuItems(S.documentTypeList('page').getMenuItems())
                    .filter('_type == "page"')
                )
            ])
        ),

      //.schemaType('page')
      //.child(S.documentTypeList('page').title('Pages')),

      ///////// FIN PAGES

      S.listItem()
        .title('Authors')
        .icon(MdPerson)
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),

      S.listItem()
        .title('Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      ///// contenu deja existant
      /*
      S.listItem()
        .title('Pages')
        .icon(MdLibraryBooks)
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Blog posts')
        .icon(MdLibraryBooks)
        .schemaType('post')
        .child(S.documentTypeList('post').title('Blog posts')),

      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
        S.listItem()
        .title('Tags')
        .icon(FaHashtag)
        .schemaType('tag')
        .child(S.documentTypeList('tag').title('Tags')),
        S.listItem()
        .title('Authors')
        .icon(MdPerson)
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),        
        S.listItem()
        .title('Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      */
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
