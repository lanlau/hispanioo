<script context="module">

 


	import client from '../sanityClient'
	import SEO from '../components/SEO'
	import JsonVisualizer from '../components/Json-visualizer'
	import Hero from '../components/Hero'
	import BlogList from '../components/blog/BlogList'
	import PageList from '../components/page/PageList'

	import blocksToHtml from '@sanity/block-content-to-html'
	import serializers from '../components/serializers'

	export async function preload({ params, query }) {

		const nbPosts=await client.fetch('*[_id == "siteSettings"].homePosts[0]')

		
		const data=await client.fetch(
			`{
				"pages":*[_type=="page" && !defined(parent)]| order(title asc){title, description, "slug":slug.current, "image":image.asset->.url},
				"posts": *[_type=="blog_post" && !defined(parent)]|order(sticky desc, publishedAt desc)[0...$nbPosts]{title, categories[]->{title,"slug":slug.current}, sticky, publishedAt, excerpt,  "slug":slug.current, "mainImage":mainImage.asset->.url, author->{name, "slug":slug.current, "image":image.asset->.url}}
			}`
		,{nbPosts});


		return {
			data
		}
	}
</script>
<script>
	import { getContext } from 'svelte';



  $: defaults=getContext('defaults');

	export let data={};

</script>

<style>

</style>
<SEO
    title={defaults.title}
    description={defaults.description}
    keywords={defaults.keywords.join(',')}
    type="website"
    
    image={defaults.defaultImage}
    thumb={defaults.defaultImage}
    card="summary_large_image"
/>

<Hero image={defaults.homeHeroImage}/>

<div class="w-full  py-6 ">

	<PageList pages={data.pages} />

	<h1 class="mt-10 mb-10 w-full md:mx-2 uppercase text-3xl border-b">A lire sur le blog</h1>
	<BlogList posts={data.posts} class="w-full lg:w-1/2  p-2 mb-10"/>
</div>
<JsonVisualizer code={defaults}/>







