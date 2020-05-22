<template>
  <div class="search-container">
    <div class="control" :class="{ 'is-loading': isLoading }">
      <input
        data-test="entrada"
        class="input"
        :class="{
          'is-danger': this.searchString && $v.$invalid,
        }"
        v-model="searchString"
        :disable="isLoading"
        @keyup.enter="onSearch"
      />
    </div>
    <p class="help is-danger" v-if="filterErrorMessages">{{ filterErrorMessages }}</p>
  </div>
</template>

<script>
import { maxLength } from "vuelidate/lib/validators";
import { getRepoInfo } from "@/services/api";

import githubUsernameRegex from "github-username-regex";

export default {
  name: "SearchBar",
  data() {
    return {
      searchString: "",
      notFound: false,
      noRepos: false,
      isLoading: false
    };
  },

  watch: {
    searchString(value) {
      if (!value) {
        this.$emit("empty-search-string");
      }
    }
  },

  validations: {
    searchString: {
      onlyAlfanumericOrOneHifen: value => githubUsernameRegex.test(value)
    }
  },

  computed: {
    filterErrorMessages() {
      if (this.searchString.length && this.$v.$invalid) {
        return `Somente até 39 caracteres alfanuméricos e somente um hifen,
          que não pode iniciar ou terminar o username.`;
      }
      return null;
    }
  },

  methods: {
    onSearch() {
      if (!this.$v.$invalid) {
        this.isLoading = true;
        getRepoInfo(this.searchString)
          .then(({ data }) => {
            if (data.length) {
              this.$emit("on-found", data);
            } else {
              this.$emit("no-repos-found");
            }
          })
          .catch(() => {
            this.$emit("user-not-found");
          })
          .finally(() => (this.isLoading = false));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.search-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
