<script context="module">
  import blocksToHtml from '@sanity/block-content-to-html'
  import client from '../../sanityClient'
  import serializers from '../../components/serializers'
  import JsonVisualizer from '../../components/Json-visualizer'





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
  
      mainImage: blocksToHtml({blocks:post.mainImage, serializers, ...client.clientConfig}),
      excerpt: blocksToHtml({blocks: post.excerpt, serializers: {marks:{pdf, link}}, ...client.clientConfig }),
      body2: blocksToHtml({blocks: post.body, serializers: {marks:{pdf, link}}, ...client.clientConfig })
    } };
  }


</script>

<script>
  export let post;
  

</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/



	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
    position: relative;
	}

	.content :global(pre) :global(code) {

		background-color: transparent;
		padding: 0;
	}

  .content :global(pre::after) {
    content: attr(data-language);
    top: 0;
    position: absolute;
    right: 0;
    background: #ff3e00;
    color: #fff;
    padding: 2px;
    border-radius: 2px;
  }

  .content :global(img) {
    display: block;
    max-width:100%;
  }

  .content :global(figure) {
    margin: 0;
  }

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}



</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>
{@html post.mainImage}
<div class='content'>
	{@html post.excerpt}
	{@html post.body2}
</div>

<JsonVisualizer code={post}/>


