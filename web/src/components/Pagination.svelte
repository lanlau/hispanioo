<script>
  export let current_page = 1;
  export let per_page = 10;
  export let total = 0;
  export let url = "";
  export let subcategory=""

  $: extraparams=subcategory? "&subcategory=" + subcategory: ""

  $: totalPages = Math.ceil(total / per_page);

  $: nextPage = current_page + 1;
  $: previousPage = current_page - 1;
</script>
{#if totalPages>1}
    <div class="flex justify-between mt-20">

        <div >
            {#if previousPage !== current_page & previousPage>0}
            <a href="{url}/?page={previousPage}{extraparams}" rel=prefetch  class="primary-button">Previous Page</a>
            {/if}
        </div>
        <div >
                {current_page} / {totalPages}
        </div>
        <div >
            {#if nextPage <= totalPages}
            <a href="{url}/?page={nextPage}{extraparams}" rel=prefetch  class="primary-button">Next Page</a>
            {/if}
        </div>
    </div>
{/if}
