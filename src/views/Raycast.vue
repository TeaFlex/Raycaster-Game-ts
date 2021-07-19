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
    constructor(...args: any[]) {
        super(args);
        const r = new RaycastGame();
        const canvas = document.getElementById(r.canvasId);
        if(!canvas)
            document.body.appendChild(r.canvas!);
        else
            canvas.replaceWith(r.canvas!);

        document.addEventListener("keydown", r.control);
    }
}
</script>

<style>

</style>