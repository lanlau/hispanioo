<script>
  export let title = "";

  export let description = "";
  export let slug = "";
  export let sticky = false;

  const getDate = date => {
    const d = new Date(date);
    return (
      d.toLocaleString("fr-FR", { day: "2-digit" }) +
      " " +
      d.toLocaleString("fr-FR", { month: "long" }) +
      " " +
      d.getFullYear()
    );
  };
</script>

<article class={$$props.class}>
  <a rel="prefetch" href={slug}>
    <div
      class="m-1 border rounded-b lg:rounded-b-none lg:rounded-r p-4
      justify-between leading-normal {sticky ? 'bg-orange-200' : ''}
      hover:bg-orange-200">

      <div class=" text-lg mb-2 text-orange-600">
        <a rel="prefetch" href={slug}>{title}</a>
      </div>
      {#if description}
        <p class="text-grey text-sm ">
          {@html description}
        </p>
      {/if}
    </div>
  </a>
</article>
