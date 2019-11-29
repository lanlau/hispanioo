<script>

export let instruction=""
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const start=()=>{
      dispatch("start")
  }
</script>

<div class="w-full flex justify-center items-center flex-col">

    <div class="w-5/6 p-5 bg-gray-300">
        <h1 class="text-xl mb-5 text-orange-600">Avant de commencer l'exercice</h1>
        {@html instruction}
    </div>
    <div>
    <button on:click={start}  class="primary-button mt-10">Commencer l'exercice</button>
    </div>
</div>