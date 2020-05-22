<template>
  <div class="page">
    <div class="title title-placeholder">{{ thread.title }}</div>
    <div>
      <p>Criado em: {{ thread.created_at }}</p>
      <p>Por: {{ thread.created_by }}</p>
    </div>
    <router-link to="/" data-test="voltar">
      <div class="button">Voltar</div>
    </router-link>
    <div class="content-container" ref="body"></div>
    <div class="content-container">
      <p class="title is-5">Comentários ({{thread.total_replies}})</p>
      <div v-for="reply in thread.replies" :key="reply.id">
        <div class="reply-container" data-test="resposta">
          <div class="reply-title">
            <div>
              <p>
                <span class="reply-name">{{reply.user.name}}</span>
                - {{reply.user.email}}
              </p>
            </div>
            <div>
              <p>Em: {{reply.created_at}}</p>
            </div>
          </div>
          <div>{{reply.body}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getThread } from "@/services/api";

export default {
  name: "Thread",

  data() {
    return {
      thread: {}
    };
  },

  props: {
    thread_slug: String,
  },

  created() {
    this.loadThread();
  },

  methods: {
    loadThread() {
      return getThread(this.thread_slug)
        .then(thread => {
          this.thread = thread;
          this.$refs.body.innerHTML = thread.body;
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.$router.push({ name: "NotFound" });
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.title-placeholder {
  margin-top: 30px;
  margin-bottom: 20px;
}

.content-container {
  margin-top: 20px;
  width: 60%;
}

.reply-container {
  margin-bottom: 15px;

  .reply-title {
    display: flex;
    justify-content: space-between;

    .reply-name {
      font-weight: bold;
    }
  }
}
</style>

