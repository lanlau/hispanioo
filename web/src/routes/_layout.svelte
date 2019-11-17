<script context="module">
  	import JsonVisualizer from '../components/Json-visualizer'
	import client from '../sanityClient'
	
	export async function preload() {
		

		const data=await client.fetch(
			`*[_id == "siteSettings"]{  
				title,
				subtitle,
				description,
				
				blogPostsPerPage,
				homePosts,
				keywords,
				
				"defaultImage":defaultImage.asset->.url, 
				"homeHeroImage":homeHeroImage.asset->.url,
				'topmenu_pages':topmenu_pages[]->{title,'slug':slug.current}}[0]`
		);


		return {
			data
		}
	}
</script>


<script>
	import { setContext } from 'svelte';
	
	import Nav from '../components/Nav.svelte';
	import Tailwindcss from '../Tailwindcss.svelte'

	
	export let segment;
	export let data;

	setContext('defaults', data);
</script>

<style>

</style>

<Tailwindcss/>

<Nav {segment} pages={data.topmenu_pages}/>

<main class="container mx-auto py-24 px-2" >
	<slot ></slot>
</main>