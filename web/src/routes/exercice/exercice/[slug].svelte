<script context="module">
  import toHtml from "../../../serialize/index.js";
  import client from "../../../sanityClient";
  import SEO from "../../../components/SEO.svelte";
  import JsonVisualizer from "../../../components/Json-visualizer.svelte";

  export async function preload({ params }) {
    const { slug } = params;

    let defaults = await client.fetch(`*[_id == "siteSettings"][0]`);

    let exercice = await client.fetch(
      `*[_type=="exercice" && slug.current==$slug][0]{_id,title,instruction,questions,resultMessage025,resultMessage2650,resultMessage5175,resultMessage76100}`,
      { slug }
    );

    const questions = exercice.questions.map(question => {
      return {
        ...question,
        instruction: toHtml(question.instruction)
      };
    });

    exercice.questions = questions;

    return {
      defaults,
      exercice: {
        ...exercice,
        resultMessages: exercice.resultMessages
          ? [...exercice.resultMessages]
          : [...defaults.resultMessages],
        instruction: toHtml(exercice.instruction)
      }
    };
  }
</script>

<script>
  import { onMount } from "svelte";

  import exerciceStore from "./exercice_store.js";
  import Results from "./results.svelte";
  import { getComponent } from "../../../components/questions/index.js";
  import ExerciceInstruction from "../../../components/exercice/ExerciceInstruction.svelte";
  export let exercice = { currentQuestion: {}, results: [] };

  let showResults = false;
  let showInstruction = false;
  let test;
  onMount(async () => {
    showInstruction = exercice.instruction ? true : false;
    exerciceStore.load(exercice);
  });

  const goToQuestion = idx => {
    exerciceStore.goToQuestion(idx);
  };
  const startExercice = () => {
    showInstruction = false;
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
    margin: 5px;
    color: #fff;
    background-color: lightgrey;
  }
  .active {
    background-color: #ffb91d;
  }
</style>

<JsonVisualizer code={$exerciceStore} />
<h1 class="title">
  <a
    href="/"
    on:click|preventDefault={() => window.history.back()}
    class="title hover:text-black">
    Exercices
  </a>
  >
  <span class="text-black">{exercice.title}</span>
</h1>
{#if $exerciceStore.data && $exerciceStore.data.questions}
  {#if showInstruction}
    <ExerciceInstruction
      instruction={exercice.instruction}
      on:start={startExercice} />
  {:else}
    <div>
      {#if !showResults}
        <div class="pb-5 flex ">
          {#each $exerciceStore.data.questions as question, index (question._key)}
            <span
              class="questionnumber px-5"
              class:active={index === $exerciceStore.currentQuestionIdx}
              on:click={() => goToQuestion(index)}>
              {index + 1}
            </span>
          {/each}
        </div>
        {#if $exerciceStore.currentQuestion.instruction}
          <h1 class="text-xl bg-gray-300 p-10 mb-10">
            {@html $exerciceStore.currentQuestion.instruction}
          </h1>
        {/if}
        {#each [1] as test}
          <svelte:component
            this={getComponent($exerciceStore.currentQuestion._type)}
            data={$exerciceStore.currentQuestion}
            on:updateQuestion={updateQuestion} />
        {/each}
        {#if $exerciceStore.results && $exerciceStore.currentQuestion && $exerciceStore.results.hasOwnProperty($exerciceStore.currentQuestion._key)}
          <button class="primary-button mt-5" on:click={nextQuestion}>
            Suivant
          </button>
        {/if}
      {:else}
        <Results messages={exercice.resultMessages} />
      {/if}
    </div>
  {/if}
{:else}
  <h1 class="text-4xl">Loading</h1>
{/if}
