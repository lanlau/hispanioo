import T from '@sanity/base/initial-value-template-builder'
export default [
    ...T.defaults(),

    T.template({
        id:'post-category',
        title:'Post Category',
        description: 'Post preset with a category',
        schemaType:'blog_post',
        parameters:[{name:'categoryId', type:'string'}],
        value:params=>({
            publishedAt: (new Date()).toISOString(), 
            author:{_type:'reference', _ref:'f632877f-128c-4f5b-af94-24c642d93a97'},
            categories: [{_type:'reference', _ref:params.categoryId}]
        })
    }),

    T.template({
        id:'post-tag',
        title:'Post Tag',
        description: 'Post preset with a tag',
        schemaType:'blog_post',
        parameters:[{name:'tagId', type:'string'}],
        value:params=>({
            publishedAt: (new Date()).toISOString(), 
            author:{_type:'reference', _ref:'f632877f-128c-4f5b-af94-24c642d93a97'},
            tags: [{_type:'reference', _ref:params.tagId}]
        })
    }),    
    
  ]