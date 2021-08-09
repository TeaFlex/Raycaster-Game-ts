<template>
    <div class="ytVideo">
        <iframe 
            :width="width.toString()" 
            :height="height.toString()" 
            :src="src" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen 
            class="shadow">
        </iframe>
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Props {
    src = prop<string>({
        //If you see this, go watch it !
        default: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    });

    width = prop<number>({
        default: 560,
    });

    height = prop<number>({
        default: 315,
    });
}

export default class YoutubeIframe extends Vue.with(Props) {}
</script>

<style>
.ytVideo>iframe {
    width: 80%;
    height: 100%
}
.ytVideo>span {
    font-style: italic;
    text-align: center;
}
</style>