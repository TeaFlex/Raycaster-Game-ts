<template>
  <topbar/>
  <router-view/>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import topbar from "./components/Topbar.vue";

@Options({
  components: {
    topbar
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
</style>
