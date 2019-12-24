<script>
  import toHtml from "../../serialize";
  import JsonVisualizer from "../../components/Json-visualizer";
  import exerciceStore from "./exercice_store.js";
  import { onMount } from "svelte";
  import { getContext } from "svelte";

  export let messages = [];

  $: defaults = getContext("defaults");
  let currentQuestion;
  let nbQuestions;
  let nbCorrectes;
  let message;
  let score;

  onMount(async () => {
    nbQuestions = $exerciceStore.data.questions.length;
    nbCorrectes = 0;
    message = "";

    Object.keys($exerciceStore.results).map(questionId => {
      if ($exerciceStore.results[questionId].isCorrect) {
        nbCorrectes++;
      }
    });

    score = nbQuestions ? Math.round((nbCorrectes * 100) / nbQuestions) : 0;

    for (let i = 0; i < messages.length; i++) {
      if (messages[i].isEqual === true) {
        if (score <= messages[i].score) {
          message = toHtml(messages[i].texte);
          break;
        }
      } else {
        if (score < messages[i].score) {
          message = toHtml(messages[i].texte);
          break;
        }
      }
    }
  });
</script>

<style>
  div {
    text-align: center;
  }
</style>

<div class="w-full p-10 bg-gray-300">

  <h2 class="text-3xl">{score}%</h2>
  <p class="text-sm">{nbCorrectes} / {nbQuestions} correcte(s)</p>
  <div class="mt-10">
    {@html message}
  </div>
</div>
