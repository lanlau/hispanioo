<script>

export let instruction=""
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const start=()=>{
      dispatch("start")
  }
</script>
<h1 class="text-xl mb-10">Instruction avant de commencer l'exercice</h1>
<div class="w-full">
<div class="p-5">
{@html instruction}
<button on:click={start}  class="primary-button mt-10">Commencer l'exercice</button>
</div>

</div>