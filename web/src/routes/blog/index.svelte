<script context="module">
	import client from '../../sanityClient'
	import BlogCard from '../../components/BlogCard'
import JsonVisualizer from '../../components/Json-visualizer'

  import blocksToHtml from '@sanity/block-content-to-html'
  import serializers from '../../components/serializers'


	export async function preload({ params, query }) {

		const data=await client.fetch(
			`{
				"posts": *[_type=="blog_post" ]|order(sticky desc, publishedAt desc)[0...9]{title, sticky, categories[]->{title,"slug":slug.current}, publishedAt, excerpt,  "slug":slug.current, "mainImage":mainImage.asset->.url, author->{name, "slug":slug.current, "image":image.asset->.url}},
				"categories": *[_type=="blog_category" ] | order(title asc){title, "slug": slug.current}
			}`
		);

		const posts=data.posts;
		const categories=data.categories;

		const newPosts=posts.map( post=>
			({
				...post,
				excerpt: blocksToHtml({blocks:post.excerpt, serializers, ...client.clientConfig})
			})
		)

		return { posts:[...newPosts], categories}


	}
</script>

<script>
  export let posts=[];
  export let categories=[];


</script>

<style>

</style>

<svelte:head>
	<title>BLOG</title>
</svelte:head>

<h1 class="title">Blog</h1>
<section class="sm:flex">

	<section class="md:w-4/6 pr-2">
		{#if posts}
		{#each posts as post}

					<BlogCard 
						class=" mb-10 {post.sticky? 'bg-orange-200':''}"
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
		{/if}
	</section>
	<section class="md:w-2/6 pl-2">
		<h2 class="">CATEGORIES</h2>
		{#each categories as category}
			<a href="category/{category.slug}" 
			class="helvetica text-gray-600 text-xs pl-8 pr-0 pt-5 pb-5 border-b border-gray-400 block hover:text-orange-600 capitalize">{category.title}</a>
		{/each}
	</section>	
</section>