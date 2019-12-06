<script>
  import exerciceStore from "../../routes/exercice/exercice_store.js";
  import { getContext } from "svelte";
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import { createEventDispatcher } from "svelte";

  export let content = {};

  const dispatch = createEventDispatcher();

  onMount(() => {
    dispatch("mount", {
      _key: content._key,
      text: content.text
    });
  });

  let value =
    $exerciceStore.answers[$exerciceStore.currentQuestion._key] &&
    $exerciceStore.answers[$exerciceStore.currentQuestion._key][content._key]
      ? $exerciceStore.answers[$exerciceStore.currentQuestion._key][content._key]
          .texte
      : "";

  $: onChange = () => {
    dispatch("change", {
      _key: content._key,
      text: value
    });
  };

  $: checkIfGood = e => {
    let correctionMode = false;

    const result = $exerciceStore.results[$exerciceStore.currentQuestion._key]
      ? $exerciceStore.results[$exerciceStore.currentQuestion._key]
      : {};
    if (result.hasOwnProperty("isCorrect")) {
      correctionMode = true;
    } else {
      return null;
    }

    if (
      result.detail &&
      result.detail[content._key] &&
      result.detail[content._key].isCorrect === true
    ) {
      return true;
    }

    return false;
  };
</script>
<style>
  input {
    padding: 5px;
  }

  .good {
    background-color: green;
    color:#fff;
  }

  .wrong {
    background-color: red;
    color:#fff;
  }
  input {
    border: 1px solid lightgrey;
  }
  input:focus {
    outline: null;
  }
  span {
    color: green;
    font-weight: bolder;
  }
</style>

<input 
  on:change={onChange} 
  bind:value={value} 
  type="text"
  class:good={checkIfGood()===true}
  class:wrong={checkIfGood()===false}
  
 /> 
{#if $exerciceStore.results[$exerciceStore.currentQuestion._key] && $exerciceStore.results[$exerciceStore.currentQuestion._key].hasOwnProperty('isCorrect')}
 <span>({content.text.replace('|',' ou ')})&nbsp;</span>
 {/if}

