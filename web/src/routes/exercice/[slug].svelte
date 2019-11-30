<script context="module">
  import toHtml from '../../serialize/index.js'
  import client from '../../sanityClient'
  import SEO from '../../components/SEO'
  import JsonVisualizer from '../../components/Json-visualizer'

  export async function preload({ params }) {

    const { slug } = params


		let defaults=await client.fetch(`*[_id == "siteSettings"]`)


    const exercice = await client.fetch(`*[_type=="exercice" && slug.current==$slug][0]{title,instruction,questions,resultMessage025,resultMessage2650,resultMessage5175,resultMessage76100}`, { slug })


    if(Object.getOwnPropertyNames(exercice).length === 0){
      this.error('404', 'Blog post not found')
    }
    return  {exercice:{
      ...exercice,
      instruction: toHtml(exercice.instruction)
 
    }
   } ;
  }

</script>
<script>
  import { onMount } from "svelte";
  
	import exerciceStore from "./exercice_store.js";
	import Results from "./results.svelte";
	import { getComponent } from "../../components/questions/index.js";
  import ExerciceInstruction from '../../components/exercice/ExerciceInstruction.svelte'
  export let exercice = {};

  
  let showResults = false;
  $:showInstruction=exercice.instruction?true:false
	$:test=exercice? exerciceStore.load(exercice):null;

	const goToQuestion = idx => {
	  exerciceStore.goToQuestion(idx);
	};
  const startExercice=()=>{
    showInstruction=false
  }
	const updateQuestion = () => {};
	const nextQuestion = () => {
	  if (
	    $exerciceStore.currentQuestionIdx + 1 >
	    $exerciceStore.data.questions.length - 1
	  ) {
	    showResults = true;
	  } else {
	    exerciceStore.goToQuestion($exerciceStore.currentQuestionIdx + 1);
	  }
	};
</script>
<style>
  .questionnumber {
    padding: 5px;
    margin: 5px;
    color: #fff;
    background-color: lightgrey;
  }
  .active {
    background-color: #ffb91d;
  }

</style>

<h1 class="title">
    <a href="/" on:click|preventDefault={()=>window.history.back()} class="title hover:text-black">Exercices</a> > 
    <span class="text-black">{exercice.title}</span>
</h1>
{#if showInstruction}
  <ExerciceInstruction instruction={exercice.instruction} on:start={startExercice}/>
{:else}
  <div>
  {#if !showResults}
      <div class="pb-5 flex ">
    {#each $exerciceStore.data.questions as question, index }
      <span
      class="questionnumber" 
      class:active={index === $exerciceStore.currentQuestionIdx}
      
      on:click={()=>goToQuestion(index)}
      >{index+1}</span>
    {/each}
    </div>
    {#if $exerciceStore.currentQuestion.title}
    <h1 class="text-lg">{$exerciceStore.currentQuestion.title}</h1>
    {/if}
    {#each [1] as d ($exerciceStore.currentQuestion._key)}
    <svelte:component 
      this={getComponent($exerciceStore.currentQuestion._type)}
      data={$exerciceStore.currentQuestion} 
      on:updateQuestion={updateQuestion}
    />
    {/each}

    {#if $exerciceStore.results.hasOwnProperty($exerciceStore.currentQuestion._key)}
    <button class="primary-button  mt-5" on:click={nextQuestion}>Suivant</button>
    {/if} 
  {:else}
    <Results/>
  {/if}
  </div>
{/if}


