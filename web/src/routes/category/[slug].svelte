<script context="module">
    import client from '../../sanityClient'
    import Pagination from '../../components/Pagination'
    import JsonVisualizer from '../../components/Json-visualizer'
	import SEO from '../../components/SEO'
    import BlogList from '../../components/blog/BlogList'


    import blocksToHtml from '@sanity/block-content-to-html'
    import serializers from '../../components/serializers'

	export async function preload({ params, query }) {

        const { slug } = params
        const {page}= query;

		let paginationSettings=await client.fetch(`{
			"per_page":*[_id == "siteSettings"].blogPostsPerPage[0],
			"total":count(*[_type=="blog_post" && $slug in categories[]->.slug.current]) 
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
                "category":*[_type=="blog_category" && slug.current == $slug]{title}[0],
                "posts": *[_type=="blog_post" && $slug in categories[]->.slug.current]|order(sticky desc, publishedAt desc)[$from...$to]{title, categories[]->{title,"slug":slug.current}, sticky, publishedAt, excerpt,  "slug":slug.current, "mainImage":mainImage.asset->.url, author->{name, "slug":slug.current, "image":image.asset->.url}}
			}`
		, { slug, from,to });


    if(Object.getOwnPropertyNames(data.category).length === 0){
      this.error('404', 'Blog post not found')
    }
		return {
            data,
            paginationSettings
		}
	}



</script>
<script>
    export let data={};
    export let paginationSettings={};

</script>

<SEO
    title="Catégories - {data.category.title}"
    description="Tous les billets Hispanioo reliés à la catégorie {data.category.title}"
/>

<h1 class="title">
    <a href="blog" class="title hover:text-black">Blog</a> > 
    <a href="category" class="title hover:text-black">Categories</a> > 
    <span class="text-black">{data.category.title}</span>
</h1>

<BlogList posts={data.posts} class="w-full lg:w-1/2 p-2 mb-10"/>
<Pagination
    current_page={paginationSettings.current_page}
    per_page={paginationSettings.per_page}
    total={paginationSettings.total}
    url="/category/{paginationSettings.slug}"
/>	








