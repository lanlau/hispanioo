import DefaultQuestion from "./DefaultQuestion.svelte";
import fillInTheBlanks from "./FillInTheBlanks.svelte";
import Qcs from "./Qcs.svelte";
import Qcm from "./Qcm.svelte";
const components = {
  fillInTheBlanks,
  qcs: Qcs,
  qcm: Qcm
};

export const getComponent = name => {
  if (!components[name]) return DefaultQuestion;
  return components[name];
};
