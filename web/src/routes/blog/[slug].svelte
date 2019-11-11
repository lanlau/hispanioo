<script context="module">
  import blocksToHtml from '@sanity/block-content-to-html'
  import client from '../../sanityClient'
  import serializers from '../../components/serializers'
  import JsonVisualizer from '../../components/Json-visualizer'


import Hero from '../../components/Hero'


	export async function preload({ params }) {

		// the `slug` parameter is available because
    // this file is called [slug].html
    const { slug } = params
    const filter = '*[_type == "blog_post" && slug.current == $slug][0]'

    const projection = `{
    
      ...,
      excerpt,
      categories[]->{_id,title},
      author->{_id,name, "url":image.asset->.url   },
      "mainImage":mainImage.asset->.url,
      body[]{
        ...,
        markDefs[]{...,_type=="pdf"=>{_type,asset->{url}}},
        children[]{
          ...,
          _type == 'authorReference' => {
            author->
          }
          
        }
      }
    }`

    const query = filter + projection
    const post = await client.fetch(query, { slug }).catch(err => this.error(500, err))


    const h = blocksToHtml.h
    const pdf=props=>(
      h('a',{target:"_blank",href:props.mark.asset.url}, props.children)
    )

    const mainImage=props=>(
      h('img',{src:props.url}, props.children)
    )

    const link= props=>{
      return (
      h('a', {target:"_blank", href:props.mark.href}, props.children)
    )} 


    return { post: {
      ...post,
  
      
      excerpt: blocksToHtml({blocks: post.excerpt, serializers: {marks:{pdf, link}}, ...client.clientConfig }),
      body2: blocksToHtml({blocks: post.body, serializers: {marks:{pdf, link}}, ...client.clientConfig })
    } };
  }


</script>

<script>
  export let post;
  

</script>

<style>
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1 class="title">{post.title}</h1>
<Hero image={post.mainImage}/>
<div class='page-content'>
	{@html post.excerpt}
	{@html post.body2}
</div>

<JsonVisualizer code={post}/>


