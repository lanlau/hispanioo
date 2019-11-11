<script context="module">
  import client from '../../sanityClient'
  import JsonVisualizer from '../../components/Json-visualizer'
 import BlogCard from '../../components/BlogCard'

  import blocksToHtml from '@sanity/block-content-to-html'
  import serializers from '../../components/serializers'

	export async function preload({ params, query }) {

        const { slug } = params
		const data=await client.fetch(
			`{
                "tag":*[_type=="blog_tag" && slug.current == $slug]{name}[0],
                "posts": *[_type=="blog_post" && $slug in tags[]->.slug.current]|order(sticky desc, publishedAt desc)[0...9]{title, categories[]->{title,"slug":slug.current}, sticky, publishedAt, excerpt,  "slug":slug.current, "mainImage":mainImage.asset->.url, author->{name, "slug":slug.current, "image":image.asset->.url}}
			}`
		, { slug });

		const posts=data.posts;

		const newposts=posts.map( post=>
			({
				...post,
				excerpt: blocksToHtml({blocks:post.excerpt, serializers, ...client.clientConfig})
			})
		)

		return {
			data:{
				...data,
				posts:[
					...newposts
				]
			}
		}
	}



</script>
<script>
	export let data=null;

</script>

<style>

</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1 class="title"><a href="blog" class="title hover:text-black">Blog</a> > <a href="tag" class="title hover:text-black">Tags</a> > <span class="text-black">{data.tag.name}</span></h1>
	{#if data}
		<div class="flex flex-wrap">
		{#each data.posts as post}

						<BlogCard 
							class="w-1/2 p-2 mb-10"
							title={post.title}
							description={post.excerpt }
							categories={post.categories}
							image={post.mainImage}
							author={post.author}
							slug="blog/{post.slug}"
							date={post.publishedAt}
							sticky={post.sticky}
						/>
					
		{/each}
		</div>
	{/if}
<JsonVisualizer code={data}/>







