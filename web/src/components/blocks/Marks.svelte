<script>
  import Blank from "./Blank.svelte";
  import DefaultComponent from "./DefaultComponent.svelte";
  import Strong from "./Strong.svelte";
  import Em from "./Em.svelte";
  

  import Span from "./Span.svelte";
  import H1 from "./H1.svelte";
  import Image from "./Image.svelte";
  import Div from "./Div.svelte";

  const getComponent = componentName => {
    if (components[componentName]) return components[componentName];
    console.warn("Wasn't able to find this component", componentName);
    return components.defaultComponent;
  };

  const components = {
    blank: Blank,
    defaultComponent: DefaultComponent,
    normal: DefaultComponent,
    strong: Strong,
    em: Em,
    span: Span,
  
    h1: H1,
    image: Image,
    div: Div
  };
  export let marks = [];
  export let content;
  $: getNextMarks = () => {
    if (!marks) return [];
    return marks.filter(item => item !== marks[0]);
  };
</script>

{#if marks.length > 0}
  <!-- hack to force remount of component-->
  {#each [1] as d (content._key)}
    <svelte:component
      this={getComponent(marks[0])}
      on:change
      on:mount
      {content}>

      {#if getNextMarks().length > 0}
        <svelte:self marks={getNextMarks()} on:change on:mount {content} />
      {:else}{content.text}{/if}

    </svelte:component>
  {/each}
{/if}
