<script>
	import { getContext } from 'svelte';
  $: defaults=getContext('defaults');
export let image=""
</script>


<img class="{$$props.class} w-full object-cover object-center" style="height:400px" src="{image?image:defaults.defaultImage}?w=1000&format=auto" alt="">