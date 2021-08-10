<template>
    
    <div id="imgShow" class="center-flex">
        <div id="quitShow" @click="hide" @touchleft="hide">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
        <img :src="src" :alt="alt">
    </div>
</template>

<script lang="ts">
import { prop, Vue } from "vue-class-component";

class Props {
    src = prop<string>({
        default: "https://i.kym-cdn.com/photos/images/original/001/688/629/5f3.jpg",
    });

    alt = prop<string>({
        default: "hac",
    });
}

export default class ImgShow extends Vue.with(Props) {
    hide() {
        document.getElementById('imgShow')!.style.display = "none";
    }
}
</script>

<style>
#imgShow {
    user-select: none;
    display: none;
    flex-flow: column nowrap;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
}

#imgShow>img {
    width: 50%;
}

#imgShow>#quitShow {
    position: absolute;
    cursor: pointer;
    width: 5vw;
    height: 5vw;
    top: 0;
    margin: 2em;
    right: 0;
    color: var(--highlight-color);
    border-radius: 5px;
}

#imgShow>#quitShow:hover {
    background-color: var(--shadow-color);
}
#imgShow>#quitShow:active {
    background-color: var(--darker-hover);
}

@media (max-width: 640px) {
    #imgShow>#quitShow {
        width: 10vw;
        height: 10vw;
    }
    #imgShow>img {
        width: 80%;
    }
}
</style>