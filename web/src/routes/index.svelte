<script context="module">
  import client from '../sanityClient'
  import JsonVisualizer from '../components/Json-visualizer'



	export async function preload({ params, query }) {


		const res=await client.fetch('*[_type=="page" && !defined(parent)]{title, "slug":slug.current, "image":image.asset->.url}');
		const pages=res

		const res2=await client.fetch('*[_type=="blog_post" && !defined(parent)][0...9]{title, "slug":slug.current, "image":image.asset->.url}');
		const blogs=res2;

		return {
			pages,
			blogs
		}
		/*return client.fetch('*[_type=="page" && !defined(parent)]{title, "slug":slug.current, "image":image.asset->.url}').then(pages => {
				return { pages };
			}).catch(err => this.error(500, err));*/
	}



</script>
<script>
	export let pages;
	export let blogs;
</script>

<style>
	h1 {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}




	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	div{
		margin:20px;
		padding:20px;
		border:1px solid red
	}
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>My super blog!</h1>
<h2>Pages</h2>
{#if pages}
{#each pages as page}
<div>{page.title}</div>
{/each}
{/if}
<h2>Derniers billets</h2>
{#if blogs}
{#each blogs as blog}
<div>{blog.title}</div>
{/each}
{/if}




