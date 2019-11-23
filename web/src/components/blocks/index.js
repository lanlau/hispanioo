import Blankword from "./Blankword.svelte";
import DefaultComponent from "./DefaultComponent.svelte";
import Strong from "./Strong.svelte";
import Em from "./Em.svelte";
import Marks from "./Marks.svelte";
import Block from "./Block.svelte";
import Span from "./Span.svelte";
import H1 from "./H1.svelte";
import Image from "./Image.svelte";
import Div from "./Div.svelte";

export const getComponent = componentName => {
  if (components[componentName]) return components[componentName];
  console.warn("Wasn't able to find this component", componentName);
  return components.defaultComponent;
};

export const components = {
  blankword: Blankword,
  defaultComponent: DefaultComponent,
  normal: DefaultComponent,
  strong: Strong,
  em: Em,
  span: Span,
  marks: Marks,
  block: Block,
  h1: H1,
  image: Image,
  div: Div
};
