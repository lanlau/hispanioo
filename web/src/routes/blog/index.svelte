<script context="module">
  import client from "../../sanityClient";
  import SEO from "../../components/SEO.svelte";
  import { getPaginationSettings } from "../../utils/pagination";
  import Pagination from "../../components/Pagination.svelte";
  import BlogList from "../../components/blog/BlogList.svelte";

  import JsonVisualizer from "../../components/Json-visualizer.svelte";

  export async function preload({ params, query }) {
    const { page } = query;
    let paginationSettings = await client.fetch(`{
			"per_page":*[_id == "siteSettings"].blogPostsPerPage[0],
			"total":count(*[_type=="blog_post"]) 
		}`);

    paginationSettings = getPaginationSettings(
      page,
      paginationSettings.per_page,
      paginationSettings.total
    );

    const data = await client.fetch(
      `{
				"posts": *[_type=="blog_post" ]|order(sticky desc, publishedAt desc)[$from...$to]{title, sticky, categories[]->{title,"slug":slug.current}, publishedAt, excerpt,  "slug":slug.current, "mainImage":mainImage.asset->.url, author->{name, "slug":slug.current, "image":image.asset->.url}},
				"categories": *[_type=="blog_category" ] | order(title asc){title, "slug": slug.current},
				"tags": *[_type=="blog_tag" ] | order(name asc){name, "slug": slug.current}
			}`,
      { from: paginationSettings.from, to: paginationSettings.to }
    );

    const posts = data.posts;
    const categories = data.categories;
    const tags = data.tags.sort((a, b) =>
      a.name.localeCompare(b.name, "fr", { ignorePunctuation: true })
    );
    return { posts, categories, tags, paginationSettings };
  }
</script>

<script>
  export let posts = [];
  export let categories = [];
  export let tags = [];
  export let paginationSettings = {};
</script>

<SEO
  title="Hispanioo Blog"
  description="Découvrez l'actualité des pays hispanophones" />

<h1 class="title">
  <span class="text-black">Blog</span>
</h1>
<section class="sm:flex">
  <section class="md:w-4/6 pr-2">
    <BlogList {posts} class="mb-10" />
    <Pagination
      current_page={paginationSettings.current_page}
      per_page={paginationSettings.per_page}
      total={paginationSettings.total}
      url="/blog" />
  </section>
  <section class="md:w-2/6 pl-2">
    <h2 class="">CATEGORIES</h2>
    <div class="flex flex-wrap">
      {#each categories as category}
        <a
          href="category/{category.slug}"
          rel="prefetch"
          class="w-full helvetica text-gray-600 text-xs pl-8 pr-0 pt-5 pb-5
          border-b border-gray-400 block hover:text-orange-600 capitalize">
          {category.title}
        </a>
      {/each}
    </div>
    <h2 class="mt-5 mb-5">TAGS</h2>
    <div class="flex flex-wrap">
      {#each tags as tag}
        <a
          href="tag/{tag.slug}"
          rel="prefetch"
          class="helvetica text-white text-xs p-1 m-1 bg-orange-600
          hover:bg-gray-800 capitalize">
          {tag.name}
        </a>
      {/each}
    </div>
  </section>
</section>
