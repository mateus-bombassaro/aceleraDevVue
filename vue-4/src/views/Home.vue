<template>
  <div class="page">
    <p class="title margin-top-20">Fórum Codenation</p>
    <div class="posts-container">
      <div class="box" v-for="post in posts" :key="post.id" data-test="thread">
        <div class="container">
          <p class="title">{{ post.title }}</p>
          <div class="post-info">
            <div>
              <p>Replies: {{ post.total_replies }}</p>
            </div>
            <div>
              <p>Por: {{ post.user.name }}</p>
            </div>
            <div>
              <p>Criado em: {{ post.created_at }}</p>
            </div>
            <router-link
              :to="{ name: 'Thread', params: { thread_slug: post.slug } }"
              data-test="link"
            >
              <p>Acessar</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchPosts } from "@/services/api";

export default {
  name: "Posts",
  data() {
    return {
      posts: []
    };
  },

  created() {
    this.loadPosts();
  },

  methods: {
    loadPosts() {
      fetchPosts().then(posts => {
        this.posts = posts;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
}
.margin-top-20 {
  margin-top: 20px;
}

.posts-container {
  padding-top: 20px;
}

.post-info {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
