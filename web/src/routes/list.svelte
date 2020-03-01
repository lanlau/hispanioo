<script context="module">
  import client from "../sanityClient";

  export async function preload({ params, query }) {

    const data = await client.fetch(
      `{
                "posts": *[_type=="blog_post" ]|order(sticky desc, publishedAt desc){"slug":slug.current},
                "pages": *[_type == "page" ]{"slug":slug.current},
                "exercices": *[_type == "exercice" && !defined(private) ]|order(sticky desc, publishedAt desc) {"slug":slug.current}
			}`,
      {  }
    );
    
    return { posts:data.posts, pages:data.pages,exercices:data.exercices };
  }
</script>

<script>
  export let posts=[];
  export let pages=[];
  export let exercices=[];
</script>

<h1>Posts</h1>
{#each posts as post (post.slug)}
    <a href={`/blog/${post.slug}`}>{post.slug}</a>
{/each}
<h1>Pages</h1>
{#each pages as page (page.slug)}
    <a href={`/page/${page.slug}`}>{page.slug}</a>
{/each}
<h1>Exercices</h1>
{#each exercices as exercice (exercice.slug)}
    <a href={`/exercice/exercice/${exercice.slug}`}>{exercice.slug}</a>
{/each}