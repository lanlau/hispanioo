<script context="module">
  import client from "../sanityClient";
  import SEO from "../components/SEO.svelte";
  import JsonVisualizer from "../components/Json-visualizer.svelte";
  import Hero from "../components/Hero.svelte";
  import BlogList from "../components/blog/BlogList.svelte";
  import PageList from "../components/page/PageList.svelte";

  import blocksToHtml from "@sanity/block-content-to-html";
  import serializers from "../components/serializers";

  export async function preload({ params, query }) {
    const settings = await client.fetch(`*[_id == "siteSettings"]
			{
				homePosts,  
 				"home_pages":home_pages[]->{title, description, "slug":slug.current, "image":image.asset->.url}
			}[0]
		`);

    const nbPosts = settings.homePosts;
    const pages = settings.home_pages;

    const posts = await client.fetch(
      `*[_type=="blog_post" && !defined(parent)]|order(sticky desc, publishedAt desc)[0...$nbPosts]{title, categories[]->{title,"slug":slug.current}, sticky, publishedAt, excerpt,  "slug":slug.current, "mainImage":mainImage.asset->.url, author->{name, "slug":slug.current, "image":image.asset->.url}}
			`,
      { nbPosts }
    );

    return {
      posts,
      pages
    };
  }
</script>

<script>
  import { getContext } from "svelte";
  $: defaults = getContext("defaults");
  export let posts = [];
  export let pages = {};
</script>

<SEO
  title={defaults.title}
  description={defaults.description}
  keywords={defaults.keywords.join(',')}
  type="website"
  image={defaults.defaultImage}
  thumb={defaults.defaultImage}
  card="summary_large_image" />

<!--<Hero image={defaults.homeHeroImage}/>-->

<div class="w-full py-6 ">

  <PageList {pages} />

  <h1 class="mt-10 mb-10 w-full md:mx-2 uppercase text-xl border-b">
    Derniers billets
  </h1>
  <BlogList {posts} class="w-full lg:w-1/2 p-2 mb-10" />
</div>
