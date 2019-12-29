import imageUrlBuilder from "@sanity/image-url";
import blocksToHtml from "@sanity/block-content-to-html";

import client from "../sanityClient";

const builder = imageUrlBuilder(client);

const urlFor = source => {
  return builder.image(source);
};

const h = blocksToHtml.h;

const pdf = props => {
  return h(
    "a",
    { target: "_blank", href: props.mark.asset.url },
    props.children
  );
};

const mainImage = props => {
  const src = props.url
    ? props.url
    : urlFor(props.node)
        .width(1000)
        .fit("max")
        .url();
  return h(
    "img",
    { src: src, alt: props.alt, title: props.caption },
    props.children
  );
};

const outsideImage = props => {
  return h("img", { src: props.node.src, alt: props.node.alt }, props.children);
};

const File = props => {
  //https://cdn.sanity.io/files/9g18swjx/production/7624e12515299e5898af728f14d9c8384aed6b39.pdf?dl
  const url = props.node.asset ? props.node.asset.url : null;

  const originalFilename = props.node.asset
    ? props.node.asset.originalFilename
    : null;

  const title = props.node.title ? props.node.title : originalFilename;

  const href = props.url ? props.url : url;
  return h(
    "a",
    { class: "file", target: "_blank", href: href },
    "Afficher: " + title
  );
};

const iframe = props => {
  return h("iframe", {
    src: props.node.src,
    allowfullscreen: "allowfullscreen",
    width: "560",
    height: "315",
    frameborder: "0"
  });
};

const formerLink2 = props => {
  return h(
    "a",
    {
      target: "_blank",
      href: props.node.href,
      title: props.node.title,
      alt: props.node.alt
    },
    props.children
  );
};

const link = props => {
  return h("a", { target: "_blank", href: props.mark.href }, props.children);
};

const toHtml = contentToTransform => {
  if (!contentToTransform) return "";

  return blocksToHtml({
    blocks: contentToTransform,
    serializers: {
      types: { outsideImage, iframe, mainImage, File },
      marks: { pdf, link }
    },
    ...client.clientConfig
  });
};

export default toHtml;
