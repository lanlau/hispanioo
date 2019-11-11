<script>
   export let showCode=false
   export let code

  const toggle=()=>{
    console.log('Trying to toggle code')
    showCode=!showCode
  } 
</script>

<style>
    .code {
        position:fixed;
        overflow:auto;
        right:0;
        top:0;
        background-color: lightgrey;
        padding:20px;
    }

    .code button{
        margin:0
    }
    .code pre{
        width:600px;
        height:90vh;
        background:transparent;
        margin:0;
        padding:0
    }

</style>

<div class="code z-50">
  <button on:click={toggle}>Toggle Code</button>
  {#if showCode}
  <pre>{JSON.stringify(code,null,2)}</pre>
  {/if}
</div>