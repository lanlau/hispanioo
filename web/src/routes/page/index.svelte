<script context="module">
  import client from '../../sanityClient'
  import PageList from '../../components/page/PageList'
  
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
<PageList pages={pages} class="w-full lg:w-1/3 md:mx-2 mb-4 md:mb-0"/>
