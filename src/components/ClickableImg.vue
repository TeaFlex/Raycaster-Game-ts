<template>
    <figure class="clickImg">
        <img :src="src" :alt="alt">
        <figcaption>
            <slot></slot>
        </figcaption>
    </figure>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Props {
    src = prop<string>({
        default: "none",
    });

    alt = prop<string>({
        default: "Image",
    });
}

export default class ClickableImg extends Vue.with(Props) {
}

</script>

<style>
.clickImg>img{
    width: 100%;
}
.clickImg>figcaption {
    text-align: center;
    font-style: italic;
}
</style>