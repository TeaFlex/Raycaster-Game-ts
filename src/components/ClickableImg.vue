<template>
    <figure class="clickImg">
        <img :src="src" :alt="alt" class="shadow" @click="onClickImg" @touchleft="onClickImg">
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
    onClickImg(e: PointerEvent) {
        const show = document.getElementById("imgShow")!;
        const img = show.children.item(1) as HTMLImageElement;
        const target = e.target as HTMLImageElement;
        img.src = target.src;
        img.alt = target.alt;
        show.style.display = "flex";
    }
}

</script>

<style>
.clickImg>img{
    width: 100%;
    cursor: pointer;
}
.clickImg>figcaption {
    text-align: center;
    font-style: italic;
}
</style>