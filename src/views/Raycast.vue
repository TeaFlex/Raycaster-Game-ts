<template>
  raycast !!!
  <canvas id="scene"></canvas>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Game } from "@/model/Game";

@Options({
    components: {}
})
export default class Raycast extends Vue {

    raycast?: Game;

    constructor(...args: any[]) {
        super(args);
    }

    mounted() {
        const canvas = document.getElementById("scene") as HTMLCanvasElement;
        this.raycast = new Game(canvas);
        document.addEventListener('keydown', this.raycast.control);
    }
}
</script>

<style>
canvas {
    display: block;
    border: brown solid 1px;
}
</style>