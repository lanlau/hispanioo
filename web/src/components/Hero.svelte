<script>
import {image as defaultImage} from '../defaults.js'
export let image=""
</script>

<div 
class="{$$props.class} w-full  relative flex items-center justify-center  bg-no-repeat sm:bg-cover sm:bg-center md:bg-center 
lg:bg-center xl:bg-center bg-cover  rounded-b-lg shadow" style="height:400px;background-image:url({image?image:defaultImage}) ">
</div>