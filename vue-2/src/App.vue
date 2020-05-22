<template>
  <div id="app" class="section container">
    <div class="title-container">
      <p class="title">{{ pageTitle }}</p>
    </div>
    <questions-component />
  </div>
</template>

<script>
import QuestionsComponent from "@/components/questions";

export default {
  name: "App",
  components: {
    QuestionsComponent
  },

  data: () => ({
    pageTitle: "Quiz in Vue"
  })
};
</script>

<style lang="scss" scoped>
.title-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
