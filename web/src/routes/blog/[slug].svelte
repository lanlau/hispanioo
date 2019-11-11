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
      categories[]->{_id,title, "slug":slug.current},
      tags[]->{_id,name, "slug":slug.current},
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

  const getDate=(date)=>{
      const d=new Date(date)
      return d.toLocaleString('fr-FR',{day:'2-digit'}) +' ' + d.toLocaleString('fr-FR',{month:'long'}) +' ' + d.getFullYear()
  }
</script>

<script>
  export let post={categories:[],tags:[]};
  



</script>

<style>
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>
<Hero image={post.mainImage}/>
<p class="pt-5 capitalize text-gray-600 text-xs">
  <span>{getDate(post.publishedAt)}</span>
  <span class="lowercase">dans</span>

  {#each post.categories as  category, idx}
      {#if idx>0}, {/if} 
      <a class="text-orange-600 capitalize text-xs font-light" rel=prefetch href="category/{category.slug}">{category.title}</a>
      
  {/each}
</p>

<h1 class="title">{post.title}</h1>

<div class='page-content'>
	{@html post.excerpt}
	{@html post.body2}
</div>
{#if post.tags}
<div class="mt-10">
    <span class="font-bold text-xs mb-5">Tags:</span>
    <p>
		{#each post.tags as tag}
			<a href="tag/{tag.slug}" 
			class="helvetica text-white text-xs p-1 mr-2  bg-orange-600 hover:bg-gray-800 capitalize">{tag.name}</a>
		{/each}	
    </p>
</div>
{/if}
<JsonVisualizer code={post.tags}/>


