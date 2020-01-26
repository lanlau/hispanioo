<script>
  import { onMount } from "svelte";
  import exerciceStore from "../../routes/exercice/exercice/exercice_store.js";

  import PortableText from "../portableText/PortableText.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let data = {};

  let selected = [];

  onMount(async () => {
    selected = [];
  });

  $: checkIfGood = option => {
    let correctionMode = false;

    const result = $exerciceStore.results[$exerciceStore.currentQuestion._key]
      ? $exerciceStore.results[$exerciceStore.currentQuestion._key]
      : {};
    if (result.hasOwnProperty("isCorrect")) {
      correctionMode = true;

      if (option.isCorrect === true) return true;
      if (
        $exerciceStore.results[$exerciceStore.currentQuestion._key] &&
        $exerciceStore.results[
          $exerciceStore.currentQuestion._key
        ].detail.hasOwnProperty(option._key)
      )
        return false;
    } else {
      return null;
    }
  };

  const check = () => {
    let nbCorrectInQuestion = 0;
    let nbCorrectAnswers = 0;
    let answersToStore = {};
    Object.values($exerciceStore.currentQuestion.options).map(option => {
      let answerCorrect = {};
      if (option.isCorrect) {
        nbCorrectInQuestion++;
        if (selected.includes(option._key)) {
          nbCorrectAnswers++;
          answersToStore[option._key] = true;
        }
      } else {
        if (selected.includes(option._key)) {
          answersToStore[option._key] = false;
        }
      }
    });

    const isCorrect = nbCorrectInQuestion === nbCorrectAnswers;
    console.log("isCorrect", isCorrect);

    exerciceStore.doAction("check", {
      _key: data._key,
      answer: answersToStore,
      isCorrect: isCorrect
    });
  };
</script>

<style>
  label {
    display: block;
  }
  .good {
    background-color: green;
    color: #fff;
  }

  .wrong {
    background-color: red;
    color: #fff;
  }
</style>

<main id="main">
  <form>
    {#each $exerciceStore.currentQuestion.options as option (option._key)}
      <label
        class="p-5 mb-5 border border-gray-300"
        class:good={checkIfGood(option) === true}
        class:wrong={checkIfGood(option) === false}>
        <input
          type="checkbox"
          bind:group={selected}
          value={option._key}
          class="mr-5" />
        {option.text}
      </label>
    {/each}
    {#if !$exerciceStore.results || !$exerciceStore.results.hasOwnProperty($exerciceStore.currentQuestion._key)}
      <button
        class="primary-button mt-5"
        on:click|preventDefault
        type="submit"
        on:click={check}>
        Vérifier
      </button>
    {/if}

  </form>
</main>
