<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import "@/exampleData/exampleImageLoader.js";
import "@/exampleData/exampleTextImageLoader.js";
import "@/exampleData/petctImageIdLoader.js";
export default {
  name: "App"
};
</script>

<style lang="less">
@import "./styles/base.less";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
</style>
