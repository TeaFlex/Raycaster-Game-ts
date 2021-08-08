<template>
    <section class="content" id="game">
        <canvas id="scene"></canvas>
        <div id="touchControl">
            <button id="up">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
            </button>
            <button id="left">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
            </button>
            <button id="right">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </button>
            <button id="down">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
            </button>
            <div id="empty"></div> 
        </div>
        <p>
            To control the camera, you can use the arrow keys or the arrows on the screen.
        </p>
    </section>
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

        const buttons = document.querySelectorAll("#touchControl>button") as NodeListOf<HTMLButtonElement>;
        buttons.forEach(b => {
            b.addEventListener("click", this.control);
            b.addEventListener("touchleave", this.control);
        });
        console.log(buttons);
        
    }

    control(e: Event) {
        let key = "";
        if(e instanceof KeyboardEvent) 
            key = e.code.replace(/^(Arrow)/gm, "").toLowerCase();
        else {
            const target = (e.target as HTMLElement);
            if(target.parentElement instanceof HTMLButtonElement)
                key = target.parentElement!.id;
            else
                key = target.parentElement!.parentElement!.id;
        }
        

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
#scene {
}

#game p{
    text-align: center;
}

#touchControl {
    display: grid;
    grid-template-columns: repeat(3, 33%);
    grid-template-rows: repeat(3, 33%);
    width: 5em;
    height: 5em;
    padding: 1em;
}

#touchControl>button, #touchControl>#empty {
    height: 100%;
    width: 100%;
    font-size: 1em;
    padding: 0;
    background-color: var(--main-color);
    color: var(--highlight-color);
    border: 0;
}

#touchControl>button:hover {
    background-color: var(--darker-hover);
} 

#touchControl>button:active {
    background-color: var(--darker-color);
}

#up {
    grid-column: 2/3;
    border-radius: 1em 1em 0 0;
}

#down {
    grid-column: 2/3;
    grid-row: 3/4;
    border-radius: 0 0 1em 1em;
}

#left {
    grid-column: 1/2;
    grid-row: 2/3;
    border-radius: 1em 0 0 1em;
}

#right {
    grid-column: 3/4;
    grid-row: 2/3;
    border-radius: 0 1em 1em 0;
}

#empty {
    grid-column: 2/3;
    grid-row: 2/3;
}


@media (max-width: 640px) {
    #touchControl {

        width: 7em;
        height: 7em;
    }
}
</style>