<script context="module">
	import client from '../../sanityClient'
	import SEO from '../../components/SEO'
	import JsonVisualizer from '../../components/Json-visualizer'

  	import blocksToHtml from '@sanity/block-content-to-html'
  	import serializers from '../../components/serializers'


	export async function preload({ params, query }) {
		const tags=await client.fetch(
			`*[_type=="blog_tag" ]|order(name asc){name,  "slug":slug.current}`
		);
		return {tags:tags.sort((a, b) => a.name.localeCompare(b.name, 'fr', {ignorePunctuation: true}))}
	}
</script>

<script>
  export let tags=[]
</script>
<SEO
    title="Tags"
    description="Tous les billets Hispanioo par tags"
/>

<h1 class="title">Tags</h1>
<section class="flex flex-row align-baseline justify-start flex-wrap">
    {#each tags as tag}
        <a  href="tag/{tag.slug}" 
        class="helvetica text-white text-xs p-1 m-2  bg-orange-600 hover:bg-gray-800 capitalize">{tag.name}</a>
    {/each}		
</section>
