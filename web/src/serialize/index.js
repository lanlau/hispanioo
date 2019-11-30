
import imageUrlBuilder from '@sanity/image-url'
import blocksToHtml from '@sanity/block-content-to-html'
import client from '../sanityClient'


const builder=imageUrlBuilder(client)

const urlFor=(source)=>{
    return builder.image(source)
}


const h = blocksToHtml.h

const pdf=props=>{
  return h('a',{target:"_blank",href:props.mark.asset.url}, props.children)
}

const mainImage=props=>{
  const src=props.url ? props.url : urlFor(props.node).width(1000).fit('max').url()  
  return h('img',{src:src, alt:props.alt, title:props.caption}, props.children)
}

const outsideImage=props=>{
  return h('img',{src:props.node.src, alt:props.node.alt}, props.children)
}

const iframe=props=>{
  return h('iframe',{src:props.node.src, allowfullscreen:'allowfullscreen',width:'560',height:'315', frameborder:'0'})
}

const formerLink2= props=>{
  return (
  h('a', {target:"_blank", href:props.node.href, title:props.node.title,alt:props.node.alt}, props.children)
)} 

const link= props=>{
  return (
  h('a', {target:"_blank", href:props.mark.href}, props.children)
)} 


const toHtml=(contentToTransform)=>{

    if(!contentToTransform) return "";

    return blocksToHtml(
        {
            blocks: contentToTransform, 
            serializers: {
                types:{outsideImage,iframe, mainImage},
                marks:{pdf,link}
            },
            ...client.clientConfig 
        }
    )

}

export default toHtml

