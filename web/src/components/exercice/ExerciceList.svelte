<script>
    import ExerciceCard from './ExerciceCard'
    export let exercices=[]

</script>
<div class="">
    {#each exercices as exercice (exercice._id)}

        <ExerciceCard 
            class="{$$props.class}"
            title={exercice.title}
            description={exercice.description }

            slug="exercice/{exercice.slug}"
            date={exercice.publishedAt}
            sticky={exercice.sticky}
        />
                
    {/each}
</div>