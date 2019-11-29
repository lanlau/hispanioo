<script context="module">
  import blocksToHtml from '@sanity/block-content-to-html'
  import client from '../../sanityClient'
  import SEO from '../../components/SEO'
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

    const outsideImage=props=>{
      return h('img',{src:props.node.src, alt:props.node.alt}, props.children)
    }

    const iframe=props=>{
      return h('iframe',{src:props.node.src, allowfullscreen:'allowfullscreen',width:'560',height:'315', frameborder:'0'})
    }

    const formerLink2= props=>{
      return (
      h('a', {target:"_blank", href:props.node.href, title:props.node.title,alt:props.node.alt}, props.children)
    )} 

    const link= props=>{
      return (
      h('a', {target:"_blank", href:props.mark.href}, props.children)
    )} 

    if(!post || Object.getOwnPropertyNames(post).length === 0){
      this.error('404', 'Blog post not found')
    }


    return { post: {
      ...post,
      body2: post.body ?blocksToHtml({blocks: post.body, serializers: {types:{outsideImage,iframe},marks:{pdf,link}}, ...client.clientConfig }):""
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

<SEO
    title={post.title}
    description={post.excerpt}
    image={post.mainImage}
    thumb={post.mainImage}

/>
<Hero image={post.mainImage}/>
<p class="pt-5 capitalize text-gray-600 text-xs">
  <span>{getDate(post.publishedAt)}</span>
  <span class="lowercase">dans</span>
  {#if post.categories}
    {#each post.categories as  category, idx}
        {#if idx>0}, {/if} 
        <a class="text-orange-600 capitalize text-xs font-light" rel=prefetch href="category/{category.slug}">{category.title}</a>
        
    {/each}
  {/if}
</p>

<h1 class="title">{post.title}</h1>
{#if post}
  <div class='page-content'>
    {@html post.excerpt}
    {#if post.body2}{@html post.body2}{/if}
  </div>
  {#if post.tags && post.tags.length >0}
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
{/if}



