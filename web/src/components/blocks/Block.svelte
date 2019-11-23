<script>
export let content = {};
import { getComponent } from "./index.js";
</script>



<svelte:component this={getComponent(content.style)}>
  <slot></slot>
</svelte:component>