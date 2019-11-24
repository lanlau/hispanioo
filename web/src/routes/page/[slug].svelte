<script context="module">
  import blocksToHtml from '@sanity/block-content-to-html'
  import SEO from '../../components/SEO'
  import client from '../../sanityClient'
  import serializers from '../../components/serializers'
  import JsonVisualizer from '../../components/Json-visualizer'

  import Hero from '../../components/Hero'
import PageList from '../../components/page/PageList'


	export async function preload({ params }) {

		// the `slug` parameter is available because
    // this file is called [slug].html
    const { slug } = params
    const filter = '*[_type == "page" && slug.current == $slug][0]'

    const projection = `{
      ...,
      "image":image.asset->.url,
      parent->{title,"slug":slug.current},
      content[]{
        ...,
        markDefs[]{...,_type=="pdf"=>{_type,asset->{url}}},
      }
    }`

    const query = filter + projection
    const post = await client.fetch(query, { slug }).catch(err => this.error(500, err))


    const childrenPages = await client.fetch('*[_type=="page" && parent._ref == $id]{title, description, "slug":slug.current, "image":image.asset->.url}', { id:post._id }).catch(err => this.error(500, err))
    

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
  
      //image: blocksToHtml({blocks:post.image, serializers, ...client.clientConfig}),
      
      content: blocksToHtml({blocks: post.content, serializers: {marks:{pdf, link}}, ...client.clientConfig })
    },
    childrenPages };
  }


</script>

<script>
  export let post;
  export let childrenPages;

</script>

<SEO
    title={post.title}
    description={post.description}
    image={post.image}
    thumb={post.image}

/>



<h1 class="title">
    {#if post.parent}
      <a href="page/{post.parent.slug}" class="title hover:text-black">{post.parent.title}</a> >
    {/if}
     
    <span class="text-black">{post.title}</span>
</h1>

<Hero image={post.image} class="mb-10"/>
<div class='page-content'>
	{#if post.description}<div>{ post.description}</div>{/if}
	<div>{@html post.content}</div>
</div>

<PageList pages={childrenPages}/>

{#if post.slug === "exercices" }
  <a href="/exercice">Accéder aux exercices</a>
{/if}


