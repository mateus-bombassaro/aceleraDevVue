<template>
  <div class="page">
    <div class="agenda-header">
      <p class="title is-3">Agenda com VUEX!</p>
      <router-link to="/create" data-test="novo-contato">
        <div class="button is-primary">Adicionar</div>
      </router-link>
    </div>
    <p class="subtitle is-4" :data-test="totalDataTest">Total: {{ totalContatos }}</p>
    <div class="box contatos-container">
      <div v-for="(contato, index) in contatos" :key="index">
        <div class="contato">
          <div>
            <p class="title is-5">{{ contato.nome }}</p>
            <p class="subtitle is-5">{{ contato.email }}</p>
          </div>
          <div>
            <div
              class="button margin-right-20"
              @click="deleteContato(index)"
              data-test="apagar"
            >Excluir</div>
            <router-link :to="{ name: 'Edit', params: { contato_id: index } }">
              <p class="button is-info" data-test="editar">Editar</p>
            </router-link>
          </div>
        </div>
      </div>
      <div v-show="!contatos.length" data-test="sem-contatos">
        <p class="title is-5 has-text-centered">Não há contatos cadastrados :(</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Agenda",

  computed: {
    ...mapState(["contatos"]),
    ...mapGetters(["totalContatos"]),

    totalDataTest() {
      return `total-${this.totalContatos}`;
    }
  },

  methods: {
    ...mapActions(["deleteContato"])
  }
};
</script>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
}

.contatos-container {
  width: 70%;

  .contato {
    display: flex;
    width: 100%;
    justify-content: space-between;
    border: 1px solid #e6e6e6;
    border-radius: 6px;
    margin-bottom: 10px;
    padding: 10px;
  }
}

.margin-right-20 {
  margin-right: 20px;
}

.agenda-header {
  display: flex;

  .title {
    margin-right: 30px;
  }
}
</style>
