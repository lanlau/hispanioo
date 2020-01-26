<script>
  import { onMount } from "svelte";
  import exerciceStore from "../../routes/exercice/exercice/exercice_store.js";
  export let name = "";
  export let data;
  onMount(() => {
    exerciceStore.doAction("update", {
      results: {
        ...$exerciceStore.results,
        [data._key]: {
          ...$exerciceStore.results[data._key],
          isCorrect: false
        }
      }
    });
  });
</script>

<p>Can't find this question type {name}</p>
