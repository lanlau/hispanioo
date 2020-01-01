<script>
  import exerciceStore from "../../routes/exercice/exercice_store.js";
  import { getContext } from "svelte";
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import { createEventDispatcher } from "svelte";

  export let content = {};

  let ref;

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
      ? $exerciceStore.answers[$exerciceStore.currentQuestion._key][
          content._key
        ].texte
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

  let specialChars = ["á", "í", "ó", "ú", "ü", "ñ", "¡", "¿"];

  const addSpecial = char => {
    var start = ref.selectionStart;
    var end = ref.selectionEnd;
    var text = ref.value;
    var before = text.substring(0, start);
    var after = text.substring(end, text.length);
    ref.value = before + char + after;
    ref.selectionStart = ref.selectionEnd = start + char.length;
    ref.focus();
    value = ref.value;
    onChange();
  };
</script>

<style>
  .input-container {
    display: inline-block;
    margin: 0;
    padding: 0;
  }
  input {
    padding: 5px;
  }

  .good {
    background-color: green;
    color: #fff;
  }

  .wrong {
    background-color: red;
    color: #fff;
  }
  input {
    border: 1px solid lightgrey;
  }
  input:focus {
    outline: null;
  }
  .correction {
    color: green;
    font-weight: bolder;
  }

  .specialcontainer {
    display: inline-block;
    position: relative;
  }

  .specialcontainer:hover .special {
    display: flex;
  }

  .specialtohover {
    display: inline-block;
    padding: 5px;
    background-color: lightblue;
    border: 1px solid lightgray;
  }
  .special {
    display: none;

    color: #fff;
    font-size: 9px;
    position: absolute;
    left: -200px;
  }
  .special a {
    padding: 5px 10px;
    margin-right: 2px;
    background-color: lightgray;
    text-decoration: none;
    font-size: 17px;
    color: #fff;
    font-weight: 500;
    border: 1px solid lightblue;
  }
</style>

<div class="input-container">
  <input
    on:change={onChange}
    bind:value
    bind:this={ref}
    type="text"
    class:good={checkIfGood() === true}
    class:wrong={checkIfGood() === false} />

  <div class="specialcontainer">
    <span class="specialtohover">Ω</span>
    <div class="special">
      {#each specialChars as char}
        <a href="/" on:click|preventDefault={() => addSpecial(char)}>{char}</a>
      {/each}
    </div>
  </div>

  {#if $exerciceStore.results[$exerciceStore.currentQuestion._key] && $exerciceStore.results[$exerciceStore.currentQuestion._key].hasOwnProperty('isCorrect')}
    <span class="correction">({content.text.replace('|', ' ou ')})&nbsp;</span>
  {/if}

</div>
