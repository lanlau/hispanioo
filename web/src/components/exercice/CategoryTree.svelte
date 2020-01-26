<script>
  export let data = [];
  export let current = "";

  let toggles = {};
</script>

<ul class="ml-2 mt-2">
  {#each data as category (category._id)}
    {#if category.subcategories}
      <li>
        <span
          class="block pb-2 cursor-pointer"
          on:click={() => {
            toggles[category._id] = !toggles[category._id];
          }}>
          {#if toggles[category._id]}-{:else}+{/if}
          {category.title}
        </span>
        <div class:hidden={toggles[category._id]}>
          {#if category.subcategories}
            {#each category.subcategories as subcategory (subcategory._id)}
              <a
                href="exercice/category/{subcategory.slug}"
                class:active={subcategory.slug === current}
                class="block pb-1 pl-2 ml-5">
                - {subcategory.title}
              </a>
            {/each}
          {/if}
        </div>

      </li>
    {/if}
  {/each}
</ul>
