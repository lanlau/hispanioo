<script context="module">
  import toHtml from "../../serialize/index.js";
  import SEO from "../../components/SEO.svelte";
  import client from "../../sanityClient";

  import JsonVisualizer from "../../components/Json-visualizer.svelte";

  import Hero from "../../components/Hero.svelte";
  import PageList from "../../components/page/PageList.svelte";

  export async function preload({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const { slug } = params;

    const filter = '*[_type == "page" && slug.current == $slug][0]';
    //*[_type == "page" && subpages[]._ref == '96d29d03-305c-47bb-821b-78c61a4e0e6a']{'slug':slug.current}

    const projection = `{
      ...,
      "image":image.asset->.url,
  	subpages[]->{title,"slug":slug.current,description,"image":image.asset->.url},

"parent":*[_type == "page" && references(^._id)][0]{title,"slug":slug.current},
      content[]{
        ...,
        _type=="File"=>{_type,asset->{url,originalFilename}},
        markDefs[]{...,_type=="pdf"=>{_type,asset->{url}}},
      }
    }`;

    const query = filter + projection;
    const post = await client
      .fetch(query, { slug })
      .catch(err => this.error(500, err));

    return {
      post: {
        ...post,
        content: toHtml(post.content)
      }
    };
  }
</script>

<script>
  export let post;
</script>

<style>
  .file {
    padding: 20px;
    background-color: #e4e4e4;
    display: block;
    margin: 10px 0 10px 0;
  }

  .hidden {
    display: none;
  }
</style>

<p class="file hidden" />
<SEO
  title={post.title}
  description={post.description}
  image={post.image}
  thumb={post.image} />

<h1 class="title">
  {#if post.parent}
    <a href="page/{post.parent.slug}" class="title hover:text-black">
      {post.parent.title}
    </a>
    >
  {/if}

  <span class="text-black">{post.title}</span>
</h1>

<Hero image={post.image} class="mb-10" />
<div class="page-content">
  <div>
    {@html post.content}
  </div>
</div>

<PageList pages={post.subpages} />

{#if post.slug.current === 'exercices'}
  <a href="/exercice" class="inline-block primary-button mt-10">
    Accéder aux exercices
  </a>
{/if}
