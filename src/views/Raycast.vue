<template>
  raycast !!!
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
        const canvas = document.getElementById(this.raycast.canvasId);
        if(!canvas)
            document.body.appendChild(this.raycast.canvas!);
        else
            canvas.replaceWith(this.raycast.canvas!);

        document.addEventListener("keydown", this.raycast.control);
    }
}
</script>

<style>

</style>