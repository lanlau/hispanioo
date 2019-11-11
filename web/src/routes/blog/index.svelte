<script context="module">
	import client from '../../sanityClient'
	import BlogList from '../../components/blog/BlogList'

	import JsonVisualizer from '../../components/Json-visualizer'

  	import blocksToHtml from '@sanity/block-content-to-html'
  	import serializers from '../../components/serializers'


	export async function preload({ params, query }) {

		const data=await client.fetch(
			`{
				"posts": *[_type=="blog_post" ]|order(sticky desc, publishedAt desc)[0...9]{title, sticky, categories[]->{title,"slug":slug.current}, publishedAt, excerpt,  "slug":slug.current, "mainImage":mainImage.asset->.url, author->{name, "slug":slug.current, "image":image.asset->.url}},
				"categories": *[_type=="blog_category" ] | order(title asc){title, "slug": slug.current},
				"tags": *[_type=="blog_tag" ] | order(name asc){name, "slug": slug.current}
			}`
		);

		const posts=data.posts;
		const categories=data.categories;
		const tags=data.tags;

		const newPosts=posts.map( post=>
			({
				...post,
				excerpt: blocksToHtml({blocks:post.excerpt, serializers, ...client.clientConfig})
			})
		)

		return { posts:[...newPosts], categories, tags}


	}
</script>

<script>
  export let posts=[];
  export let categories=[];
  export let tags=[];


</script>

<style>

</style>

<svelte:head>
	<title>BLOG</title>
</svelte:head>

<h1 class="title">Blog</h1>
<section class="sm:flex">

	<section class="md:w-4/6 pr-2">
		<BlogList posts={posts} class="mb-10"/>
	</section>
	<section class="md:w-2/6 pl-2">
		<h2 class="">CATEGORIES</h2>
		{#each categories as category}
			<a href="category/{category.slug}" 
			class="helvetica text-gray-600 text-xs pl-8 pr-0 pt-5 pb-5 border-b border-gray-400 block hover:text-orange-600 capitalize">{category.title}</a>
		{/each}

		<h2 class="mt-5 mb-5">TAGS</h2>
		{#each tags as tag}
			<a href="tag/{tag.slug}" 
			class="helvetica text-white text-xs p-1 mr-2  bg-orange-600 hover:bg-gray-800 capitalize">{tag.name}</a>
		{/each}		
	</section>	
</section>