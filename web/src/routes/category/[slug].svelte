<script context="module">
    import client from '../../sanityClient'
    import JsonVisualizer from '../../components/Json-visualizer'

    import BlogList from '../../components/blog/BlogList'


    import blocksToHtml from '@sanity/block-content-to-html'
    import serializers from '../../components/serializers'

	export async function preload({ params, query }) {

        const { slug } = params
		const data=await client.fetch(
			`{
                "category":*[_type=="blog_category" && slug.current == $slug]{title}[0],
                "posts": *[_type=="blog_post" && $slug in categories[]->.slug.current]|order(sticky desc, publishedAt desc)[0...9]{title, categories[]->{title,"slug":slug.current}, sticky, publishedAt, excerpt,  "slug":slug.current, "mainImage":mainImage.asset->.url, author->{name, "slug":slug.current, "image":image.asset->.url}}
			}`
		, { slug });



		return {
			data
		}
	}



</script>
<script>
	export let data={};

</script>

<style>

</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1 class="title">
    <a href="blog" class="title hover:text-black">Blog</a> > 
    <a href="category" class="title hover:text-black">Categories</a> > 
    <span class="text-black">{data.category.title}</span>
</h1>

<BlogList posts={data.posts} class="w-full lg:w-1/2 p-2 mb-10"/>








