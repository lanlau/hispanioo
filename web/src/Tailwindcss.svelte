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
    @apply pt-5 pb-5;
  }

  .page-content a{
    @apply text-blue-600
  }


  .page-content ul{
    @apply list-disc ml-5
  }


  .primary-button{
    @apply bg-orange-600 text-white pt-2 pb-2 pl-6 pr-6 font-light 

  }
  .primary-button:hover{
    @apply bg-gray-800
  }
</style>