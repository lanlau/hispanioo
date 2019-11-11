<script>
	import Nav from '../components/Nav.svelte';
	import Tailwindcss from '../Tailwindcss.svelte'
	export let segment;
</script>

<style>

</style>

<Tailwindcss/>
<Nav {segment}/>

<main class="container mx-auto py-24 px-2">
	<slot></slot>
</main>