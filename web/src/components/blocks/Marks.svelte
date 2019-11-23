<script>
  import { getComponent } from "./index.js";
  export let marks = [];
  export let content;
  $: getNextMarks = () => {
    if (!marks) return [];
    return marks.filter(item => item !== marks[0]);
  };
</script>

{#if marks.length>0}
<!-- hack to force remount of component-->
{#each [1] as d (content._key)}
<svelte:component  on:change on:mount  
    this={getComponent(marks[0])} content={content} >
    
    {#if getNextMarks().length>0}
      <svelte:self marks={getNextMarks()} on:change on:mount  content={content}/>
    {:else}
      {content.text}
    {/if}


</svelte:component>
{/each}
{/if}