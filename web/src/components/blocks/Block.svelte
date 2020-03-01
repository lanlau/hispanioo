<script>
export let content = {};


import Blank from "./Blank.svelte";
import DefaultComponent from "./DefaultComponent.svelte";
import Strong from "./Strong.svelte";
import Em from "./Em.svelte";
import Marks from "./Marks.svelte";

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
  marks: Marks,
  h1: H1,
  image: Image,
  div: Div
};

</script>



<svelte:component this={getComponent(content.style)}>
  <slot></slot>
</svelte:component>