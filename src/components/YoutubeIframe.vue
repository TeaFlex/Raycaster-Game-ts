<template>
    <div class="ytVideo center-flex">
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
        <div class="ytCaption">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Props {
    src = prop<string>({
        //ahah funny video goes brrrrr
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
div.ytVideo {
    flex-flow: column nowrap;
}

.ytVideo>iframe {
    width: 336px;
    height: 189px;
}
.ytVideo>.ytCaption {
    width: 336px;
    margin-top: 0.5em;
    font-style: italic;
    text-align: center;
}

</style>