<script>
export let content = {};
</script>

{#if content.marks.length <1}
  <span>{content.text}</span>
{/if}
<slot></slot>
