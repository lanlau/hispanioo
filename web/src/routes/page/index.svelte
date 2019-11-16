<script context="module">
  import client from '../../sanityClient'
  import PageList from '../../components/page/PageList'
  import SEO from '../../components/SEO'
  export function preload({ params, query }) {
    return client.fetch('*[_type == "page" && !defined(parent) ]{title, description, "slug":slug.current, "image":image.asset->.url}').then(pages => {
			return { pages };
		}).catch(err => this.error(500, err));
  }
</script>

<script>
  export let pages;
</script>

<SEO
    title="Pages"
    description="Ensemble des pages disponibles sur le site Hispanioo"
/>


<h1 class="title">Pages</h1>
<PageList pages={pages} />
