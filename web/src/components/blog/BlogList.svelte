<script>
    import BlogCard from './BlogCard'
    export let posts=[]

</script>
<div class="flex flex-wrap">
    {#each posts as post}

        <BlogCard 
            class="{$$props.class}"
            title={post.title}
            description={post.excerpt }
            categories={post.categories}
            image={post.mainImage}
            author={post.author}
            slug="blog/{post.slug}"
            date={post.publishedAt}
            sticky={post.sticky}
        />
                
    {/each}
</div>