<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    color: #444;
    background-color: #f7f7f7;
  }

  body,
  a.menu {
    font-family: "Open Sans", Helvetica, Arial, sans-serif;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a {
    /*font-family:"Roboto Slab";*/
    font-family: "Open Sans", Helvetica, Arial, sans-serif;
  }

  .helvetica {
    font-family: Helvetica, "Open Sans", Arial, sans-serif;
  }

  .title {
    @apply text-2xl text-orange-600 mb-10 mt-10;
    /*font-family: "Roboto Slab", Arial, sans-serif;*/
  }

  .page-content h4 {
    @apply text-xl font-bold pt-2 pb-2;
  }

  .page-content p {
    @apply pt-2 pb-2;
  }

  .page-content a {
    @apply text-blue-600;
  }

  .page-content ul {
    @apply list-disc ml-5;
  }

  .primary-button {
    @apply bg-orange-600 text-white pt-2 pb-2 pl-6 pr-6 font-light;
  }
  .primary-button:hover {
    @apply bg-gray-800;
  }

  .active {
    @apply text-orange-600;
  }

  h2 {
    @apply text-2xl text-orange-600;
  }
  .file {
    padding: 20px;
    background-color: #e4e4e4;
    display: block;
    margin: 10px 0 10px 0;
  }
</style>
