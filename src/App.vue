<template>
  <topbar/>
  <main class="center-flex">
    <router-view/>
  </main>
  <bottombar/>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import topbar from "./components/Topbar.vue";
import bottombar from "./components/Bottombar.vue";

@Options({
  components: {
    topbar,
    bottombar,
  }
})
export default class App extends Vue {}
</script>
<style>
body {
  margin: 0;
  background-color: var(--main-color);
  font-family: 'Courier New', Courier, monospace;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}

main {
  margin: 1em 0 1em 0;
}

@media (max-width: 640px) {
  main {
    margin: 10em 0 1em 0;
  }
}
</style>
