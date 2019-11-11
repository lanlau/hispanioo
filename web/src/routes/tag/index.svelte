<script context="module">
	import client from '../../sanityClient'
	import BlogCard from '../../components/BlogCard'
	import JsonVisualizer from '../../components/Json-visualizer'

  	import blocksToHtml from '@sanity/block-content-to-html'
  	import serializers from '../../components/serializers'


	export async function preload({ params, query }) {

		const tags=await client.fetch(
			`*[_type=="blog_tag" ]|order(name asc)[0...9]{name,  "slug":slug.current}`
		);

		

		return {tags}


	}
</script>

<script>
  export let tags=[]


</script>

<style>

</style>

<svelte:head>
	<title>TAGS</title>
</svelte:head>

<h1 class="title">Tags</h1>
<section class="">
    {#each tags as tag}
        <a href="tag/{tag.slug}" 
        class="helvetica text-white text-xs p-1 mr-2  bg-orange-600 hover:bg-gray-800 capitalize">{tag.name}</a>
    {/each}		
</section>
<JsonVisualizer code={tags}/>	
