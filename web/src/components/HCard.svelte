<script>
    
    export let title=""
    export let date;
    export let description=""
    export let image=""
    export let slug=""
    export let keywords=null
    export let categories=null
    export let author=null
    export let sticky=false

</script>

<div class={$$props.class}>
  <div class="flex-none  lg:h-auto lg:w-64  bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" 
  style="background-image: url({image})" title="{title}">
  {#if sticky}
    <span class="text-orange-600 text-5xl float-left ml-1 p-5 leading-none">&#9733;</span>
  {/if}
  </div>
  <!--border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t 
  lg:border-grey-light---->
  <div class="flex-grow  rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-col justify-between leading-normal">
    <div class="mb-8">
      <div class=" font-bold text-xl mb-2"><a rel=prefetch href="{slug}">{title}</a></div>
      
      <p class="text-grey-darker text-base">{@html description}</p>
    </div>
    {#if author}
    <div class="flex items-center">
      <img class="w-10 h-10 rounded-full mr-4" src="{author.image}" alt="{author.name}">
      <div class="text-sm">
        <p class="text-black leading-none">{author.name}</p>
        <p class="text-grey-dark">{(new Date(date)).toLocaleDateString('fr-FR')}</p>
      </div>
    </div>
    {/if}
  </div>
</div>