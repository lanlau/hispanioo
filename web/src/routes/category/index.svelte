<script context="module">
	import client from '../../sanityClient'
	import SEO from '../../components/SEO'
	import JsonVisualizer from '../../components/Json-visualizer'

	export async function preload({ params, query }) {
       
		const categories=await client.fetch(
			`*[_type=="blog_category" ]|order(name asc)[0...9]{title,  "slug":slug.current}`
		);
		return {categories}
	}
</script>

<script>
  export let categories=[]
</script>

<SEO
    title="Catégories"
    description="Tous les billets Hispanioo par catégories"
/>
<h1 class="title">Catégories</h1>
<section class="">
		{#each categories as category}
			<a href="category/{category.slug}" 
			class="helvetica text-gray-600 text-xs pl-8 pr-0 pt-5 pb-5 border-b border-gray-400 block hover:text-orange-600 capitalize">{category.title}</a>
		{/each}		
</section>
