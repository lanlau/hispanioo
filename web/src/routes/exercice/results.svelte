<script>
  import toHtml from '../../serialize'
  import JsonVisualizer from '../../components/Json-visualizer'
  import exerciceStore from "./exercice_store.js";
  import { onMount } from "svelte";
	import { getContext } from 'svelte';

  $: defaults=getContext('defaults');

  let score = 0;
  let nbQuestions = 0;
  let nbCorrectes = 0;
  let message="";
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

    switch (true){
      case (score<25):{
        console.log('<25')
        message= toHtml(defaults.resultMessages.resultMessage025);
        break;
      }
      case (score>=25 && score <50) :{
        console.log('>=25 & <50')
        message= toHtml(defaults.resultMessages.resultMessage2550);
        break;  }
      case (score>=50 && score <75) :{
        console.log('>=50 & <75')
        message= toHtml(defaults.resultMessages.resultMessage5075);
        break; }
      case (score>=75 && score <100) :{
        console.log('>=75 & <100')
        message= toHtml(defaults.resultMessages.resultMessage75100);
        break; }
      case (score==100):{
        console.log('==100')
        message= toHtml(defaults.resultMessages.resultMessage100);
        break;  }
      default:
        console.log('pas de cas trouve')
        message= 'pas de message'                          
    }

  });

  const getResultMessage=(score)=>{
    console.log('score',score,toHtml(defaults.resultMessages.resultMessage025))

    //return defaultStatus.message
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


