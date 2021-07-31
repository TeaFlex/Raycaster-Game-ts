<template>
  raycast !!!
  <canvas id="scene"></canvas>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { RayCasterGame } from "@/model/RayCasterGame";

@Options({
    components: {}
})
export default class Raycast extends Vue {

    raycast?: RayCasterGame;

    constructor(...args: any[]) {
        super(args);
    }

    mounted() {
        const canvas = document.getElementById("scene") as HTMLCanvasElement;
        this.raycast = new RayCasterGame(canvas);
        document.addEventListener('keydown', this.raycast.control);
    }
}
</script>

<style>
canvas {
    display: block;
    border: brown solid 2px;
}
</style>