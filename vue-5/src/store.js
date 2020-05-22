import Vue from 'vue';
import Vuex from 'vuex';
import Persistence from 'vuex-persist';

Vue.use(Vuex);

const local = new Persistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    contatos: [],
  },

  mutations: {
    ['SET_CONTATOS'](state, contatos) {
      state.contatos = contatos;
    },
  },

  getters: {
    totalContatos: ({ contatos }) => contatos.length,
  },

  actions: {
    addContato: ({ commit, state }, contato) => {
      const { contatos } = state;
      commit('SET_CONTATOS', [...contatos, contato]);
    },

    updateContato: ({ commit, state }, { contato, index }) => {
      let contatosList = state.contatos;
      contatosList[index] = contato;
      commit('SET_CONTATOS', contatosList);
    },

    deleteContato: ({ commit, state }, index) => {
      let contatosList = [...state.contatos];
      contatosList.splice(index, 1);
      commit('SET_CONTATOS', contatosList);
    },
  },

  plugins: [local.plugin],
});
