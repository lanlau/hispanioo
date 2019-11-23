<script>
  import Parser from "./Parser3.svelte";
  export let content;
</script>

{#if !content}
nothing to display
{:else}


<Parser content={content} on:registerBlank on:change on:mount/>

{/if}