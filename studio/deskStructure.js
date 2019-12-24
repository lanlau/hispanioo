import S from '@sanity/desk-tool/structure-builder'
import { MdSettings } from 'react-icons/md'
import { MdPerson } from 'react-icons/md'
import { MdLibraryBooks } from 'react-icons/md'
import { MdFilterList } from 'react-icons/md'
import { FaHashtag } from 'react-icons/fa'
import { FaLink } from 'react-icons/fa'
import { MdSchool } from 'react-icons/md'
import React from 'react'
const hiddenDocTypes = listItem =>
  ![
    'blog_tag',
    'blog_category',
    'blog_post',
    'siteSettings',
    'page',
    'author',
    'exercice',
    'exercice_subcategory',
    'exercice_category',
    'exercice_link_subcategory',
    'exercice_tag'
  ].includes(listItem.getId())

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
              S.listItem()
                .title('All Pages')
                .icon(MdFilterList)
                .child(
                  S.documentList()
                    .title('List of pages')
                    .schemaType('page')
                    .menuItems(S.documentTypeList('page').getMenuItems())
                    .filter('_type == "page"')
                ),
              S.divider(),
              ////
              S.listItem()
                .title('View pages hierarchy (view only)')
                .icon(MdFilterList)
                .child(
                  S.documentTypeList('page')
                    .title('sublevel')
                    .filter(
                      ' _type == "page" && count(*[ _type == "siteSettings" && ^._id in topmenu_pages[]._ref ]) > 0 '
                    )

                    .child(id =>
                      S.documentTypeList('page')
                        .title('subpages')
                        .filter(
                          '_type == $type && count(*[ _type == "page" && _id == $id && ^._id in subpages[]._ref ]) > 0  '
                        )
                        .params({ type: 'page', id })

                        .child(id =>
                          S.documentTypeList('page')
                            .schemaType('page')
                            .menuItems([])
                            .title('subpages')
                            .filter(
                              '_type == $type && count(*[ _type == "page" && _id == $id && ^._id in subpages[]._ref ]) > 0  '
                            )
                            .params({ type: 'page', id })
                            .child(id =>
                              S.documentList('page')
                                .schemaType('page')
                                .menuItems([])
                                .title('subpages')
                                .filter(
                                  '_type == $type && count(*[ _type == "page" && _id == $id && ^._id in subpages[]._ref ]) > 0  '
                                )
                                .params({ type: 'page', id })
                                .child(id =>
                                  S.documentList('page')
                                    .schemaType('page')
                                    .menuItems()
                                    .title('subpages')
                                    .filter(
                                      '_type == $type && count(*[ _type == "page" && _id == $id && ^._id in subpages[]._ref ]) > 0  '
                                    )
                                    .params({ type: 'page', id })
                                )
                            )
                        )
                    )
                ),
              S.listItem()
                .title('Orphan Pages')
                .icon(MdFilterList)
                .child(
                  S.documentList()
                    .title('List of pages')
                    .schemaType('page')
                    .menuItems(S.documentTypeList('page').getMenuItems())
                    .filter('_type == "page" && count(*[references(^._id)])==0')
                )
            ])
        ),

      //.schemaType('page')
      //.child(S.documentTypeList('page').title('Pages')),

      ///////// FIN PAGES
      /////debut exercices

      S.listItem()
        .title('Exercices')
        .icon(MdSchool)
        .child(
          S.list()
            .title('Options')
            .items([
              S.listItem()
                .title('Catégories')
                .child(S.documentTypeList('exercice_category')),
              S.listItem()
                .title('Sous Catégories')
                .child(S.documentTypeList('exercice_subcategory')),
              ,
              S.divider(),
              S.listItem()
                .title('Tags')
                .icon(FaHashtag)
                .child(S.documentTypeList('exercice_tag')),
              ,
              S.listItem()
                .title('Exercices sans tags')
                .icon(MdFilterList)
                .child(
                  S.documentTypeList('exercice').filter('_type=="exercice" && !defined(tags)')
                ),
              S.divider(),
              S.listItem()
                .title('Lien entre sous catégories et exercices')
                .icon(FaLink)
                .child(S.documentTypeList('exercice_link_subcategory')),
              ,
              S.listItem()
                .title('Exercices')
                .icon(MdSchool)
                .child(S.documentTypeList('exercice'))
            ])
        ),

      ////fin exercices
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

      ///debut files

      S.listItem()
        .title('Files')
        .child(
          S.documentTypeList('sanity.fileAsset')
            .title('Assets')
            .menuItems([
              ...S.documentTypeList('sanity.fileAsset').getMenuItems(),
              S.orderingMenuItem({
                title: 'Filename asc',
                by: [{ field: 'originalFilename', direction: 'asc' }]
              }),
              S.orderingMenuItem({
                title: 'Filename desc',
                by: [{ field: 'originalFilename', direction: 'desc' }]
              })
            ])
        ),
      ////fin files

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
