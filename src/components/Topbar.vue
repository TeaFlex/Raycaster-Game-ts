<template>
    <header id="topbar" class="flex">
        <router-link :to="{name: Raycast}">
            <h1>Raycaster-Game-ts</h1>
        </router-link>
        <nav class="flex">
            <span v-for="(value, key) in infos" :key="key">
                <router-link :to="{name: value}">{{key}}</router-link>
            </span>
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
}
</script>

<style>
#topbar {
    padding: 1em;
    background-color: rgb(34, 34, 34);
    color: white;
}

#topbar>nav {
    height: 100%;
}

#topbar>nav a {
    padding: 1em;
}

.flex {
    display: flex;
    flex-flow: row wrap;
}

#topbar>h1 {
    margin: 0;
    margin-right: 2em;
}

#topbar a {
    text-decoration: none;
    color: white;
}
</style>