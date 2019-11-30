<script context="module">
  import {getPaginationSettings} from '../../utils/pagination'
  import client from '../../sanityClient'
  import PageList from '../../components/page/PageList'
  import SEO from '../../components/SEO'




  export async function preload({ params, query }) {

		const {page}= query;
		let paginationSettings=await client.fetch(`{
			"per_page":*[_id == "siteSettings"].blogPostsPerPage[0],
			"total":count(*[_type=="page"]) 
    }`)
    
		paginationSettings=getPaginationSettings(page, paginationSettings.per_page,paginationSettings.total)
		

		const data=await client.fetch(
			`{
        "pages": *[_type == "page" && !defined(parent) ][$from...$to]|order(title asc) {title, description, "slug":slug.current, "image":image.asset->.url},
      }`
    ,{from:paginationSettings.from,to:paginationSettings.to});
    
    return {pages:data.pages}

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
