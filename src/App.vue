<template>
  <topbar/>
  <router-view/>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Topbar from "./components/Topbar.vue";

@Options({
  components: {
    topbar: Topbar
  }
})
export default class App extends Vue {}
</script>
<style>
body {
  margin: 0;
  background-color: rgb(46, 46, 46);
  font-family: 'Courier New', Courier, monospace;
}
</style>
