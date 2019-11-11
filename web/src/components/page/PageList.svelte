<script>
    import PageCard from './PageCard'

    export let pages=[]
</script>
{#if pages }
    <section class="block flex flex-wrap">
        {#each pages as page}
            <PageCard 
                class="w-full lg:w-1/3 p-1 mb-4  mb-5"
                title={page.title}
                description={page.description}
                image={page.image}
                slug="page/{page.slug}"
            />
        {/each}
    </section>
{/if}