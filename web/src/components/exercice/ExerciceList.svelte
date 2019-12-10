<script>
    import ExerciceCard from './ExerciceCard'
    export let exercices=[]
    export let subcategory="";
    export let tag="";

</script>
<div class="">
    {#each exercices as exercice (exercice._id, subcategory,tag)}

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