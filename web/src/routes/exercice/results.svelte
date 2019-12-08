<script>
  import toHtml from '../../serialize'
  import JsonVisualizer from '../../components/Json-visualizer'
  import exerciceStore from "./exercice_store.js";
  import { onMount } from "svelte";
	import { getContext } from 'svelte';

  $: defaults=getContext('defaults');

  
  $: nbQuestions = $exerciceStore.data.questions.length;
  $: nbCorrectes = 0;
  $: message="";

  $: Object.keys($exerciceStore.results).map(questionId => {
    if ($exerciceStore.results[questionId].isCorrect) {
      nbCorrectes++;
    }
  });

  $: score = nbQuestions ? Math.round((nbCorrectes * 100) / nbQuestions) : 0;

  $:{
    switch (true){
      case (score<25):{
        message= toHtml(defaults.resultMessages.resultMessage025);
        break;
      }
      case (score <50) :{
        message= toHtml(defaults.resultMessages.resultMessage2550);
        break;  }
      case (score <75) :{
        message= toHtml(defaults.resultMessages.resultMessage5075);
        break; }
      case (score <100) :{
        message= toHtml(defaults.resultMessages.resultMessage75100);
        break; }
      case (score==100):{
        message= toHtml(defaults.resultMessages.resultMessage100);
        break;  }
      default:
        message= 'pas de message'                          
    }
  }

  

</script>
<style>
  div {
    text-align: center;
  }



</style>
<JsonVisualizer code={defaults}/>

<div class="w-full p-10 bg-gray-300">
  <h2 class="text-3xl" >{score}%</h2>
  <p class="text-sm">{nbCorrectes} / {nbQuestions} correcte(s)</p>
  <div class="mt-10">{ @html message}</div>
</div>


