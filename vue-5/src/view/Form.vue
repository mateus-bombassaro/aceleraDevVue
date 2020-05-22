<template>
  <div class="page">
    <div class="box box-size">
      <p class="title">{{ title }}</p>
      <div class="is-fullwidth">
        <p>Nome</p>
        <input class="input" data-test="nome" v-model="contato.nome" />
      </div>
      <div class="is-fullwidth">
        <p>Email</p>
        <input class="input" data-test="email" v-model="contato.email" />
      </div>
      <div class="footer-buttons">
        <router-link to="/">
          <div class="button">Voltar</div>
        </router-link>
        <div class="button is-info" :data-test="dataTestAction" @click="onSave">
          Salvar
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ContatoForm',

  props: {
    contato_id: [Number, String],
  },

  data() {
    return {
      contato: {
        nome: null,
        email: null,
      },
    };
  },

  computed: {
    ...mapState(['contatos']),
    isEditMode() {
      return !isNaN(this.contato_id);
    },

    dataTestAction() {
      return this.isEditMode ? 'salvar' : 'criar';
    },

    title() {
      return `${this.isEditMode ? 'Editar' : 'Adicionar'} contato`;
    },
  },

  created() {
    if (this.contato_id !== null && this.contato_id !== undefined) {
      const index = parseInt(this.contato_id);
      if (this.contatos[index]) {
        this.contato = { ...this.contatos[index] };
      } else {
        this.$router.push({ name: 'NotFound' });
      }
    }
  },

  methods: {
    ...mapActions(['addContato', 'updateContato']),

    onSave() {
      this.isEditMode
        ? this.updateContato({ contato: this.contato, index: this.contato_id })
        : this.addContato(this.contato);
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style lang="scss" scoped>
.box-size {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 450px;
}

.is-fullwidth {
  width: 100%;
}

.footer-buttons {
  display: flex;
  margin-top: 10px;
  width: 100%;
  justify-content: space-between;
}
</style>
