<template>
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
        this.control = this.control.bind(this);
        document.addEventListener('keydown', this.control);
    }

    control(e: KeyboardEvent) {
        const key = e.code.replace(/^(Arrow)/gm, "").toLowerCase();

        switch(key) {
            case "up":
                this.raycast?.game.movePlayer(10)
                break;
            case "down":
                this.raycast?.game.movePlayer(-5);
                break;
            case "left":
                this.raycast?.game.rotatePlayer(0.2);
                break;
            case "right":
                this.raycast?.game.rotatePlayer(-0.2);
                break;
        }
    }
}
</script>

<style>
canvas {
    width: 80vw;
    display: block;
}

@media (max-width: 640px) {
    canvas {
        width: 100vw;
    }
}
</style>