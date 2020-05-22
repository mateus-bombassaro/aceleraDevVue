<template>
  <div class="container gthb-page">
    <h1 class="title">Buscador GitHub</h1>
    <search-bar
      @on-found="onFound"
      @empty-search-string="emptySearchString = true"
      @user-not-found="onUserNotFound"
      @no-repos-found="onNoReposFound"
    />
    <repo-cards
      class="repos-container"
      :repos="repos"
      :no-repos="noRepos"
      :not-foud="notFound"
      :empty-search-string="emptySearchString"
    />
  </div>
</template>
<script>
import SearchBar from "@/components/search-bar.vue";
import RepoCards from "@/components/repo-cards.vue";
export default {
  name: "Github",

  components: {
    SearchBar,
    RepoCards
  },

  data() {
    return {
      repos: [],
      emptySearchString: false,
      notFound: false,
      noRepos: false
    };
  },

  methods: {
    onFound(repos) {
      this.notFound = false;
      this.noRepos = false;
      this.emptySearchString = false;
      this.repos = repos;
    },
    onUserNotFound() {
      this.notFound = true;
      this.noRepos = false;
      this.emptySearchString = false;
    },
    onNoReposFound() {
      this.notFound = false;
      this.noRepos = true;
      this.emptySearchString = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.gthb-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.repos-container {
  max-height: 70vh;
}
</style>
