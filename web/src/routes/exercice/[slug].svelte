<script context="module">
import data from "./data.js";
export async function preload({ params }) {
    return {data}
}

</script>
<script>
	import { onMount } from "svelte";
	import exerciceStore from "./exercice_store.js";
	import Results from "./results.svelte";
	import { getComponent } from "../../components/questions/index.js";
	export let data = {};
	let showResults = false;
	exerciceStore.load(data);

	const goToQuestion = idx => {
	  console.log("going to question", idx);
	  exerciceStore.goToQuestion(idx);
	};

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
    <a href="exercice" class="title hover:text-black">Exercices</a> > 
    <span class="text-black">{data.title}</span>
</h1>
<div>
{#if !showResults}
    <div class="pb-5">
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


