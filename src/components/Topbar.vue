<template>
    <header id="topbar" class="flex">
        <h1>
            <router-link :to="{name: Raycast}">
                Raycaster-Game-ts
            </router-link>
        </h1>
        <div class="hamburger" @click="displayMobileMenu" @touchleave="displayMobileMenu"></div>
        <nav class="flex">
            <div v-for="(value, key) in infos" :key="key" class="button center-flex">
                <router-link :to="{name: value}">{{key}}</router-link>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class Topbar extends Vue {

    infos = {
        origin: "Raycast",
        github: "Raycast",
    };

    displayMobileMenu(e: TouchEvent | PointerEvent) {
        const el = document.querySelector("#topbar>nav")! as HTMLElement;
        el.style.maxHeight = (!el.style.maxHeight)? "100px": "";
    }
}
</script>

<style>

#topbar {
    position: sticky;
    width: 100vw;
    height: 8vh;
    background-color: var(--darker-color);
    color: white;
    align-items: center;
    user-select: none;
}

#topbar .hamburger {
    display: none;
    width: 100%;
    text-align: center;
    font-size: 3em;
}

#topbar .hamburger:after {
    content: ' \2261';
}

#topbar>nav {
    height: 100%;
    align-items: center;
    justify-content: center;
    transition: max-height 0.5s;
}

#topbar h1 {
    text-align: center;
    margin: 0.5em;
    margin-right: 2em;
}

#topbar a {
    text-decoration: none;
    color: white;
}

#topbar .button {
    height: 100%;
    justify-content: center;
    padding:  0 1em 0 1em;
}

#topbar .button:hover {
    background-color: var(--darker-hover);
    transition: background-color 0.5s;
}

@media (max-width: 640px) {

    #topbar {
        height: auto;
    }

    #topbar .hamburger {
       display: block;
    }

    #topbar .button {
        padding: 1em;
        width: 100%;
    }

    #topbar h1 {
        display: block;
        margin:0;
        width: 100%;
        padding: 0.5em;
    }

    #topbar>nav {
        overflow: hidden;
        width: 100%;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        max-height: 0;
    }
    
}
</style>