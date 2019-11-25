<script>
	import { getContext } from 'svelte';

  $: defaults=getContext('defaults');


    export let title=""
    export let date;
    export let description=""
    export let slug=""
    export let sticky=false

    const getDate=(date)=>{
        const d=new Date(date)
        return d.toLocaleString('fr-FR',{day:'2-digit'}) + ' ' + d.toLocaleString('fr-FR',{month:'long'}) +' ' + d.getFullYear()
    }

</script>


<article class="{$$props.class }">

  <div class="  rounded-b lg:rounded-b-none lg:rounded-r p-4  justify-between leading-normal {sticky? 'bg-orange-200':''}">
    
      <div class=" text-lg mb-2 hover:text-orange-600"><a rel=prefetch href="{slug}">{title}</a></div>
      <p class="text-xs capitalize mb-2">{getDate(date)}</p>
      {#if description}
        <p class="text-grey text-sm ">{@html description}</p>
      {/if}
  </div>  
  

</article>