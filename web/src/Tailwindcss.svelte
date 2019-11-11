<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body, a.menu{
    font-family: "Open Sans", Helvetica, Arial, sans-serif;
    
  }
  h1,h2,h3,h4,h5,h6, a{
    font-family:"Roboto Slab";
    font-family: "Open Sans", Helvetica, Arial, sans-serif;
  }


  .helvetica{
    font-family:  Helvetica, "Open Sans", Arial, sans-serif;
  }

  .title{
    @apply text-4xl text-orange-600 font-bold mb-10 mt-10;
    font-family:"Roboto Slab"
  }

  .page-content p{
    @apply pt-5 pb-10;
  }

  .page-content a{
    @apply text-blue-600
  }


  .page-content ul{
    @apply list-disc ml-5
  }
</style>