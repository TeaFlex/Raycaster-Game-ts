<template>
  raycast !!!
  <canvas></canvas>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { RaycastGame } from "@/model/RaycastGame";

@Options({
    components: {}
})
export default class Raycast extends Vue {

    raycast: RaycastGame;

    constructor(...args: any[]) {
        super(args);
        this.raycast = new RaycastGame();
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