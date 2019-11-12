<script context="module">
	import client from '../../sanityClient'
	import Pagination from '../../components/Pagination'
    import JsonVisualizer from '../../components/Json-visualizer'
    import BlogList from '../../components/blog/BlogList'

    import blocksToHtml from '@sanity/block-content-to-html'
    import serializers from '../../components/serializers'

	export async function preload({ params, query }) {

		const { slug } = params


        const {page}= query;

		let paginationSettings=await client.fetch(`{
			"per_page":*[_id == "siteSettings"].blogPostsPerPage[0],
			"total":count(*[_type=="blog_post" && $slug in tags[]->.slug.current]) 
		}`,{slug})

		const per_page = paginationSettings.per_page || 10;
		const last_page = Math.ceil(paginationSettings.total / per_page);
		let current_page = page || 1;
		current_page=parseInt(current_page)
		const total=paginationSettings.total;
		let from = (current_page - 1) * per_page;
		let to = current_page * per_page;

		paginationSettings={
			per_page,
			current_page,
            total,
            slug
		}

		const data=await client.fetch(
			`{
                "tag":*[_type=="blog_tag" && slug.current == $slug]{name}[0],
                "posts": *[_type=="blog_post" && $slug in tags[]->.slug.current]|order(sticky desc, publishedAt desc)[$from...$to]{title, categories[]->{title,"slug":slug.current}, sticky, publishedAt, excerpt,  "slug":slug.current, "mainImage":mainImage.asset->.url, author->{name, "slug":slug.current, "image":image.asset->.url}}
			}`
		, { slug, from,to });


		return {
            data,
            paginationSettings
		}
	}



</script>
<script>
	export let data=null;
    export let paginationSettings={};
</script>

<style>

</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1 class="title"><a href="blog" class="title hover:text-black">Blog</a> > <a href="tag" class="title hover:text-black">Tags</a> > <span class="text-black">{data.tag.name}</span></h1>

<BlogList posts={data.posts} class="w-full lg:w-1/2 p-2 mb-10"/>

<Pagination
    current_page={paginationSettings.current_page}
    per_page={paginationSettings.per_page}
    total={paginationSettings.total}
    url="/tag/{paginationSettings.slug}"
/>	







