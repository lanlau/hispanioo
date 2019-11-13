// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// document schemas
import page from './documents/page/page'

import author from './documents/author'




import blogCategory from './documents/blog/blog_category'
import blogTag from './documents/blog/blog_tag'
import blogPost from './documents/blog/blog_post'

import exercice from './documents/exercice/exercice'
import exerciceCategory from './documents/exercice/exercice_category'
import exerciceTag from './documents/exercice/exercice_tag'



import siteSettings from './documents/siteSettings'

// Object types
import bodyPortableText from './objects/bodyPortableText'
import bioPortableText from './objects/bioPortableText'
import excerptPortableText from './objects/excerptPortableText'
import mainImage from './objects/mainImage'
import authorReference from './objects/authorReference'

import choice from './objects/questions/choice'
import qcs from './objects/questions/qcs'
import qcm from './objects/questions/qcm'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'blog',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    siteSettings,

    blogCategory,
    blogTag,
    blogPost,

    exercice,
    exerciceCategory,
    exerciceTag,



    author,
    page,


    mainImage,
    authorReference,
    bodyPortableText,
    bioPortableText,
    excerptPortableText,

    qcs,
    qcm,
    choice

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ])
})
