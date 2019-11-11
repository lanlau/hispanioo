<script>
	import { getContext } from 'svelte';

  $: defaults=getContext('defaults');


    import {image as defaultImage} from '../../defaults.js'
    export let title=""
    export let date;
    export let description=""
    export let image=""
    export let slug=""
    export let keywords=null
    export let categories=null
    export let author=null
    export let sticky=false


    const getDay=(date)=>{
        const d=new Date(date)
        return d.toLocaleString('fr-FR',{day:'2-digit'})
    }

    const getMonthYear=(date)=>{
        const d=new Date(date)
        return d.toLocaleString('fr-FR',{month:'long'}) +' ' + d.getFullYear()
    }

</script>


<article class="{$$props.class } border-b-8 border-gray-400">
  <div>
    <a rel=prefetch href="blog/{slug}" class="m-0 p-0">
      <img src="{image?image:defaults.defaultImage}?w=1000&format=auto" alt={title} class="w-full  object-cover border-b-4 border-gray-200 shadow" style="height:17rem"/>
    </a>
    

  </div>
  <div class="sm:flex">
  <div class="sm:w-1/4 flex">
    <div class="p-4 border-b-8 border-gray-400 mx-auto text-center h-32">
        <span class="text-4xl">{getDay(date)}</span>
        <br/>
        <span class="text-xs uppercase">{getMonthYear(date)}</span>
    </div>
  </div>
  <div class="sm:w-3/4  rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal {sticky? 'bg-orange-200':''}">
    <div class="mb-8">
      <div class=" text-2xl mb-2 hover:text-orange-600"><a rel=prefetch href="{slug}">{title}</a></div>
      <div class="text-xs mb-4 text-gray-600 font-light">
        Par {author.name} dans
        {#each categories as  category, idx}
            {#if idx>0}, {/if} 
            <a class="text-orange-600 capitalize text-xs font-light" rel=prefetch href="category/{category.slug}">{category.title}</a>
            
        {/each}
    </div>
      <p class="text-grey text-sm ">{@html description}</p>
    </div>
    {#if author}
    <div class="flex items-center">
      <a class="bg-orange-600 text-white pt-2 pb-2 pl-6 pr-6 font-light hover:bg-gray-800" href="{slug}">Lire la suite →</a>
    </div>
    {/if}
  </div>  
  
  </div>

</article>