<template>
  <div id="app">
    <github />
  </div>
</template>

<script>
import Github from "@/views/github";
export default {
  name: "App",
  components: {
    Github
  }
};
</script>

<style lang="scss">
@import "~bulma";
</style>
