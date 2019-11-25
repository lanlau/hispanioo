<script>
  import exerciceStore from "./exercice_store.js";
  import { onMount } from "svelte";
  let score = 0;
  let nbQuestions = 0;
  let nbCorrectes = 0;
  onMount(() => {
    nbQuestions = $exerciceStore.data.questions.length;
    nbCorrectes = 0;

    console.log("resultats", $exerciceStore.results);
    Object.keys($exerciceStore.results).map(questionId => {
      if ($exerciceStore.results[questionId].isCorrect) {
        nbCorrectes++;
      }
    });

    score = nbQuestions ? Math.round((nbCorrectes * 100) / nbQuestions) : 0;
  });
</script>
<style>
  div {
    text-align: center;
  }
</style>
<h1>Resultats</h1>


<div>
  <h2>{score}%</h2>
  <p>{nbCorrectes} / {nbQuestions} correcte(s)</p>

</div>


