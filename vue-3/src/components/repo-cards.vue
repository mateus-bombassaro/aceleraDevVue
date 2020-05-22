<template>
  <div class="main-container" v-show="!emptySearchString">
    <div v-show="notFound" class="box" data-test="nao-encontrado">
      <div class="content">
        <p class="subtitle has-text-danger">Usuário não encontrado</p>
      </div>
    </div>
    <div v-show="noRepos" class="box" data-test="sem-repositorios">
      <div class="content">
        <p class="subtitle has-text-info">O usuário não tem nenhum repositório</p>
      </div>
    </div>
    <div class="card card-size" v-for="(repo, index) in repos">
      <div class="card-content" data-test="repositorio">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="repo.owner.avatar_url" alt="Placeholder image" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4 repo-name">{{ repo.name }}</p>
            <a class="url-link" :href="repo.html_url">Abrir...</a>
          </div>
        </div>
        <div class="content description">{{ repo.description || 'Sem descrição' }}</div>
        <div>
          <p>Estrelas: {{ repo.stargazers_count }}</p>
          <p>Forks: {{ repo.forks }}</p>
          <p>Watchers: {{ repo.watchers }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RepoCards",

  props: {
    repos: Array,
    notFound: Boolean,
    noRepos: Boolean,
    emptySearchString: Boolean
  }
};
</script>

<style lang="scss" scoped>
.description {
  font-style: italic;
  color: rgba(0, 0, 0, 0.4);
}

.url-link {
  margin: 0px;
  font-style: italic;
  padding: 0px;
  color: #0000ff;
}

.repo-name {
  margin: 0px !important;
  padding: 0px;
}

.card-size {
  max-width: 300px;
}

.main-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: 30px;
}
</style>
