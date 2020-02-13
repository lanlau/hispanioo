
import client from "../sanityClient";
const fs = require('fs');

const BASE_URL = "https://www.hispanioo.com";  // TO CHANGE
const pages = [""];

fs.readdirSync("./src/routes").forEach(file => {
  file = file.split('.')[0];
  if (file.charAt(0) !== '_' && file !== "sitemap" && file !== "index") {
    pages.push(file);
  }
});








const render = (pages, posts, exercices) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${pages
    .map(
      page => `
    <url><loc>${BASE_URL}/${page}</loc><priority>0.85</priority></url>
  `
    )
    .join("\n")}
  ${posts
    .map(
      post => `
    <url>
      <loc>${BASE_URL}/blog/${post.slug}</loc>
      <priority>0.69</priority>
    </url>
  `
    )
    .join("\n")}
    ${exercices
        .map(
          exercice => `
        <url>
          <loc>${BASE_URL}/exercice/exercice/${exercice.slug}</loc>
          <priority>0.69</priority>
        </url>
      `
        )
        .join("\n")}    
</urlset>
`;

export function get(req, res, next) {
  res.setHeader("Cache-Control", `max-age=0, s-max-age=${600}`); // 10 minutes
  res.setHeader("Content-Type", "application/rss+xml");
    let data={
    posts:[],
    exercices:[]

    }

    client.fetch(
    `{
        "posts": *[_type=="blog_post" ]|order(sticky desc, publishedAt desc){"slug":slug.current},
        "exercices": *[_type == "exercice" && !defined(private) ]|order(sticky desc, publishedAt desc) {"slug":slug.current},
    }`,
    {  }
    ).then((result)=>{
    data=result
    const sitemap = render(pages, data.posts, data.exercices);
    res.end(sitemap);
    })

}