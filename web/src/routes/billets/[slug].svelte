<script context="module">
  export async function preload({ params }) {
    const { slug } = params;
    console.log("SLUG called", slug);

    this.redirect(302, "/blog/" + slug);
  }
</script>
