<script context="module">
	import {getPaginationSettings} from '../../utils/pagination'
	import client from '../../sanityClient'
	import SEO from '../../components/SEO'
	import Pagination from '../../components/Pagination'
	import ExerciceList from '../../components/exercice/ExerciceList'
	import JsonVisualizer from '../../components/Json-visualizer'
	import CategoryTree from '../../components/exercice/CategoryTree'



	export async function preload({ params, query }) {
		const {page, subcategory}= query;

		let paginationSettings= subcategory?  
			await client.fetch(`{
				"total":*[_type == 'exercice_link_subcategory' && !defined(private) && subcategory->slug.current==$subcategory ]{'total':count(exercices[])}[0].total,
				"per_page":*[_id == "siteSettings"].exercicesPerPage[0],
			
			}`
			,{subcategory})
			: 
			await client.fetch(`{
				"per_page":*[_id == "siteSettings"].exercicesPerPage[0],
				"total":count(*[_type=="exercice" && !defined(private)]) 
			}`)

		paginationSettings=getPaginationSettings(page, paginationSettings.per_page,paginationSettings.total)

		paginationSettings={
			subcategory,
			...paginationSettings
		}

		const data=subcategory?
			await client.fetch(
			`{
				"exercices": *[_type == "exercice_link_subcategory" && !defined(private) && subcategory->slug.current==$subcategory ][0]{exercices[$from...$to]->{title,description,publishedAt,sticky,'slug':slug.current}}.exercices[],
				"categoryTree": *[_type == "exercice_category" ]{_id,title,'slug':slug.current, 'subcategories':subcategories[]->{_id,title,'slug':slug.current}},
				"tags": *[_type=="exercice_tag" ] | order(name asc){name, "slug": slug.current}
			}`
			,{from:paginationSettings.from,to:paginationSettings.to,subcategory: paginationSettings.subcategory})
			:
			await client.fetch(
			`{
				"exercices": *[_type=="exercice"  && !defined(private) ]|order(sticky desc, publishedAt desc)[$from...$to]{title, sticky, description, publishedAt, 'slug':slug.current},
				"categoryTree": *[_type == "exercice_category" ]{_id,title,'slug':slug.current, 'subcategories':subcategories[]->{_id,title,'slug':slug.current}},
				"tags": *[_type=="exercice_tag" ] | order(name asc){name, "slug": slug.current}
			}`
			,{from:paginationSettings.from,to:paginationSettings.to})			

		const exercices=data.exercices;
		const categoryTree=data.categoryTree;
        const tags=data.tags; 
        return{
            exercices,
            categoryTree,
            tags,
			paginationSettings,
			data
        }       
    };
</script>
<script>
export let exercices=[];
export let categoryTree=[];
export let tags=[];
export let paginationSettings={};
export let data;
let toggles={}
</script>
<JsonVisualizer code={exercices}/>
<SEO
    title="Hispanioo Exercice"
    description="Apprendre l\'espagnol tout seul"
/>

<h1 class="title"><span class="text-black">Exercices</span> </h1>

<section class="sm:flex">
<section class="md:w-2/6 pr-2 border-r">
	<a href="/exercice" class="block mb-5" class:active={!paginationSettings.subcategory}>Tous</a> 
	<h2 class="border-b order-orange-600 font-bold">Catégories:</h2>
	<CategoryTree data={categoryTree} current={paginationSettings.subcategory}/>
</section>
<section class="md:w-4/6 pr-2 pl-5">
	{#each [1] as d (paginationSettings.subcategory)}
		<ExerciceList exercices={exercices} class="border-b"/>
	{/each}
	<Pagination
	current_page={paginationSettings.current_page}
	subcategory={paginationSettings.subcategory}
	per_page={paginationSettings.per_page}
	total={paginationSettings.total}
	url="/exercice"
	/>
</section>
</section>