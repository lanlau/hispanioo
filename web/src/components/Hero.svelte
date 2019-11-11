<script>
import {image as defaultImage} from '../defaults.js'
export let image=""
</script>


<img class="{$$props.class} w-full object-cover object-center" style="height:400px" src="{image?image:defaultImage}?w=1000&format=auto" alt="">