<template>
    <header id="topbar" class="flex">
        <h1>
            <router-link :to="{name: 'Raycast'}">
                Raycaster-Game-ts
            </router-link>
        </h1>
        <div class="hamburger" @click="displayMobileMenu" @touchleave="displayMobileMenu"></div>
        <nav class="flex">
            <div v-for="(value, key) in infos" :key="key" class="button center-flex">
                <a v-if="isUrl(value)" v-bind:href="value" target="_blank">{{key}}</a>
                <router-link v-else :to="{name: value}">{{key}}</router-link>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class Topbar extends Vue {

    infos = {
        home: "Raycast",
        about: "About",
        github: "https://github.com/TeaFlex/Raycaster-Game-ts",
        donate: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    };

    displayMobileMenu(e: TouchEvent | PointerEvent) {
        const el = document.querySelector("#topbar>nav")! as HTMLElement;
        //hooo one-liner, spooky~
        const h = `${Object.keys(this.infos).length*(el.children.item(0) as HTMLButtonElement).offsetHeight}px`;
        el.style.maxHeight = (!el.style.maxHeight)? h: "";
    }

    isUrl(input: string) {
        return !!input.match(/^(http)s?:\/\//gm);
    }
}
</script>

<style>

#topbar {
    width: 100%;
    height: auto;
    background-color: var(--darker-color);
    color: var(--highlight-color);
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
    color: var(--highlight-color);
}

#topbar .button {
    justify-content: center;
}

#topbar .button a {
    padding: 1em;
}

#topbar .button:hover {
    background-color: var(--darker-hover);
    transition: background-color 0.5s;
}

@media (max-width: 640px) {

    #topbar {
        top: 0;
        position: absolute;
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