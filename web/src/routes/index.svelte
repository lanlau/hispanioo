<script context="module">
  import client from '../sanityClient'
  import JsonVisualizer from '../components/Json-visualizer'
  import Hero from '../components/Hero'
  import Card from '../components/Card'
  import BlogCard from '../components/BlogCard'

  import blocksToHtml from '@sanity/block-content-to-html'
  import serializers from '../components/serializers'

	export async function preload({ params, query }) {


		const data=await client.fetch(
			`{
				"pages":*[_type=="page" && !defined(parent)]| order(title asc){title, description, "slug":slug.current, "image":image.asset->.url},
				"posts": *[_type=="blog_post" && !defined(parent)]|order(sticky desc, publishedAt desc)[0...9]{title, categories[]->{title,"slug":slug.current}, sticky, publishedAt, excerpt,  "slug":slug.current, "mainImage":mainImage.asset->.url, author->{name, "slug":slug.current, "image":image.asset->.url}}
			}`
		);

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

<Hero image="traduction-localisation.jpg"/>

<div class="w-full  py-6 ">
	<div class="flex w-full">
	{#if data && data.pages}
		<div class="block md:flex justify-between md:-mx-2 min-w-0">
			{#each data.pages as page}
				<Card 
					class="w-full lg:w-1/3 md:mx-2 mb-4 md:mb-0"
					title={page.title}
					description={page.description}
					image={page.image}
					slug="page/{page.slug}"
				/>
			{/each}
		</div>
	{/if}
	</div>

	<h1 class="mt-10 mb-10 w-full md:mx-2 uppercase text-3xl border-b">A lire sur le blog</h1>
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
</div>







