<template>
    <footer id="bottombar">
        <a v-bind:href="url" target="_blank">@Teaflex</a> - 2021
    </footer>
</template>

<script lang="ts">
import { Vue } from "vue-class-component"

export default class Bottombar extends Vue {
    url = "https://github.com/TeaFlex";
}
</script>

<style>
#bottombar {
    background-color: var(--darker-color);
    text-align: center;
    padding: 3em 0 2em 0;
    color: var(--highlight-color);
    margin-top: auto;
}

#bottombar a {
    text-decoration-color: var(--highlight-color);
    color: var(--highlight-color);
}

@media (max-width: 640px) {
    #bottombar {
    }
}
</style>