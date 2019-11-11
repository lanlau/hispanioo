<script context="module">
  import client from '../../sanityClient'
  import Card from '../../components/Card'
  
  export function preload({ params, query }) {
    return client.fetch('*[_type == "page" && !defined(parent) ]{title, description, "slug":slug.current, "image":image.asset->.url}').then(pages => {
			return { pages };
		}).catch(err => this.error(500, err));
  }
</script>

<script>
  export let pages;
</script>

<style>

</style>

<svelte:head>
	<title>Pages</title>
</svelte:head>
<h1 class="title">Pages</h1>
<section>
	{#if pages }
		<section class="block md:flex justify-between md:-mx-2 min-w-0">
			{#each pages as page}
				<Card 
					class="w-full lg:w-1/3 md:mx-2 mb-4 md:mb-0"
					title={page.title}
					description={page.description}
					image={page.image}
					slug="page/{page.slug}"
				/>
			{/each}
		</section>
	{/if}
</section>
