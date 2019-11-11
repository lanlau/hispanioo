<script context="module">
  	import JsonVisualizer from '../components/Json-visualizer'
	import client from '../sanityClient'
	export async function preload({ params, query }) {


		const data=await client.fetch(
			`*[_id == "siteSettings"]{...,blogPostsPerPage, "defaultImage":defaultImage.asset->.url, "homeHeroImage":homeHeroImage.asset->.url}[0]`
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
<Nav {segment}/>

<main class="container mx-auto py-24 px-2" >
	<slot ></slot>
</main>