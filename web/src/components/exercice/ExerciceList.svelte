<script>
  import ExerciceCard from "./ExerciceCard.svelte";
  export let exercices = [];
</script>

<div class="flex flex-wrap">

  {#each exercices as exercice (exercice.slug)}
    <ExerciceCard
      class="w-full sm:w-1/2 {$$props.class}"
      title={exercice.title}
      description={exercice.description}
      slug="exercice/exercice/{exercice.slug}"
      date={exercice.publishedAt}
      sticky={exercice.sticky} />
  {/each}
</div>
