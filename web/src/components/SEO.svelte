<script>
    import { stores } from '@sapper/app';
    export let title=""
    export let description=""
    export let keywords=""
    export let type="website"
    export let url=""
    //export let image=""
    export let thumb=""
    export let card="summary_large_image"

    const { page } = stores();

    $: query=($page.query.page)?  Object.keys($page.query).map((key)=>   key + "=" + $page.query[key]).join('&') :null
    $: newUrl="https://" + (url? url : $page.host + $page.path + (query? '&' + query:''));
</script>
<svelte:head>
    <title>{title}</title>
    <meta name="description" content="{description}" />
    {#if keywords}
        <meta name="keywords" content="{keywords}"/>
    {/if}
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="{type}">
    <meta property="og:url" content="{newUrl}">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{description}">
    {#if thumb}
        <meta property="og:image" content="{thumb}">
    {/if}

    <!-- Twitter -->
    <meta property="twitter:card" content="{card}">
    <meta property="twitter:url" content="{newUrl}">
    <meta property="twitter:title" content="{title}">
    <meta property="twitter:description" content="{description}">
    {#if thumb}
        <meta property="twitter:image" content="{thumb}">
    {/if}
</svelte:head>