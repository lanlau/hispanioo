<script>
  import { createEventDispatcher } from "svelte";
  import { getComponent } from "../blocks/index.js";
  export let content;
  //export let showComponent = true;
  const dispatch = createEventDispatcher();
</script>

{#if Array.isArray(content)}
  {#each content as entry}
        <svelte:self on:change  on:mount  content={entry} />
  {/each}
{:else}
  {#if content.children}
    <svelte:component on:change  on:mount  this={getComponent(content._type)}  content={content}>
      {#each content.children as child}
        <svelte:self on:change  on:mount  content={child} />
      {/each}
    </svelte:component>
  {:else}

    <svelte:component on:change on:mount  
    this={getComponent(content._type)} content={content} >
        <svelte:component 
          on:change 
          on:mount 
          this={getComponent("marks")}
          content={content}
          
          marks={content.marks}
        />
    </svelte:component>
  {/if}
        
{/if}



