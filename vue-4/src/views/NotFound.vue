<template>
  <div class="page">
    <div class="container">
      <p class="title">404</p>
      <p class="subtitle">A página que você procura não foi encontrada</p>
      <router-link to="/" data-test="voltar">
        <div class="button">Voltar</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 56px;
    font-weight: bolder;
  }
}
</style>