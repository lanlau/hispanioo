<script context="module">
  import { getPaginationSettings } from "../../../utils/pagination";
  import client from "../../../sanityClient";
  import SEO from "../../../components/SEO.svelte";
  import Pagination from "../../../components/Pagination.svelte";
  import ExerciceList from "../../../components/exercice/ExerciceList.svelte";
  import JsonVisualizer from "../../../components/Json-visualizer.svelte";
  import CategoryTree from "../../../components/exercice/CategoryTree.svelte";

  export async function preload({ params, query }) {
    const { page, tag } = query;
    const { slug } = params;

    let searchedSubcategory = slug;

    const paginationQueries = {
      subcategory: {
        query: `{
				"total":*[_type == 'exercice_link_subcategory' && !defined(private) && subcategory->slug.current==$subcategory ]{'total':count(exercices[])}[0].total,
				"per_page":*[_id == "siteSettings"].exercicesPerPage[0],
				"pageTitle":*[_type=="exercice_subcategory" && slug.current ==$subcategory][0].title
			
			}`,
        params: { subcategory: searchedSubcategory }
      },
      tag: {
        query: `{
				"total":count(*[_type == 'exercice' && !defined(private) && $tag in tags[]->slug.current ]),
				"per_page":*[_id == "siteSettings"].exercicesPerPage[0],
				"pageTitle":*[_type=="exercice_tag" && slug.current ==$tag][0].name
			
			}`,
        params: { tag }
      }
    };

    let browseMode = "subcategory";
    if (tag) browseMode = "tag";

    let paginationSettings = await client.fetch(
      paginationQueries[browseMode].query,
      paginationQueries[browseMode].params
    );

    paginationSettings = {
      tag,
      subcategory: searchedSubcategory,
      pageTitle: paginationSettings.pageTitle,
      ...getPaginationSettings(
        page,
        paginationSettings.per_page,
        paginationSettings.total
      )
    };

    const dataQueries = {
      subcategory: {
        query: `{
				"exercices": *[_type == "exercice_link_subcategory" && !defined(private) && subcategory->slug.current==$subcategory ][0]{exercices[$from...$to]->{title,description,publishedAt,sticky,'slug':slug.current}}.exercices[],
				"categoryTree": *[_type == "exercice_category" ]{_id,title,'slug':slug.current, 'subcategories':subcategories[]->{_id,title,'slug':slug.current}},
				"tags": *[_type=="exercice_tag" ] | order(name asc){name, "slug": slug.current}
			}`,
        params: {
          from: paginationSettings.from,
          to: paginationSettings.to,
          subcategory: paginationSettings.subcategory
        }
      },
      tag: {
        query: `{
				"exercices": *[_type == "exercice" && !defined(private) && $tag in tags[]->slug.current ][$from...$to]{title,description,publishedAt,sticky,'slug':slug.current},
				"categoryTree": *[_type == "exercice_category" ]{_id,title,'slug':slug.current, 'subcategories':subcategories[]->{_id,title,'slug':slug.current}},
				"tags": *[_type=="exercice_tag" ] | order(name asc){name, "slug": slug.current}
			}`,
        params: {
          from: paginationSettings.from,
          to: paginationSettings.to,
          tag: paginationSettings.tag
        }
      }
    };

    const data = await client.fetch(
      dataQueries[browseMode].query,
      dataQueries[browseMode].params
    );

    const exercices = data.exercices;
    const categoryTree = data.categoryTree;
    const tags = data.tags;
    return {
      exercices,
      categoryTree,
      tags,
      paginationSettings
    };
  }
</script>

<script>
  export let exercices = [];
  export let categoryTree = [];
  export let tags = [];
  export let paginationSettings = {};
  let toggles = {};
</script>

<JsonVisualizer code={categoryTree} />
<SEO title="Hispanioo Exercice" description="Apprendre l\'espagnol tout seul" />

<h1 class="title">
  <span class="text-black">Exercices</span>
</h1>

<section class="sm:flex">
  <section class="md:w-2/6 pr-2 border-r">
    <h2 class="text-xl border-b order-orange-600 font-bold mb-5">
      Catégories:
    </h2>
    <CategoryTree
      data={categoryTree}
      current={paginationSettings.tag ? '' : paginationSettings.subcategory} />

    <h2 class="text-xl border-b order-orange-600 font-bold mb-5 mt-5">Tags</h2>
    <div class="flex flex-wrap">
      {#each tags as tag}
        <a
          href="/exercice/tag/{tag.slug}"
          rel="prefetch"
          class:tagactive={paginationSettings.tag && paginationSettings.tag == tag.slug}
          class="helvetica text-white text-xs p-1 m-1 bg-orange-600
          hover:bg-gray-800 capitalize">
          {tag.name}
        </a>
      {/each}
    </div>

  </section>
  <section class="md:w-4/6 pr-2 pl-5">
    <h1 class="text-2xl text-orange-600 capitalize">
      {paginationSettings.pageTitle}
    </h1>
    {#each [1] as d (paginationSettings.subcategory)}
      <ExerciceList
        {exercices}
        subcategory={paginationSettings.subcategory}
        tag={paginationSettings.tag} />
    {/each}
    <Pagination
      current_page={paginationSettings.current_page}
      subcategory={paginationSettings.subcategory}
      per_page={paginationSettings.per_page}
      total={paginationSettings.total}
      url="/exercice/category/{paginationSettings.subcategory}" />
  </section>
</section>
