import EditionAPI from '../services/EditionsDataService';

export const state = () => ({
  editions: [],
  loading: true,
  error: ''
});

export const mutations = {
  setEditions(state, editions) {
    state.editions = [...editions];
  },
  setMounted(state) {
    state.loading = false;
  },
  setError(state, error) {
    state.error = error;
    state.loading = false;
  }
};

export const actions = {
  async fetch({ commit }) {
    try {
      const { data: editions } = await EditionAPI.getOftenEditions();

      commit('setEditions', editions);
    } catch (err) {
      const error = err.response && err.response.data
        ? err.response.data.message
        : 'Oops! Something went wrong.';

      commit('setError', error);
    }
  },
  mounted({ commit }) {
    commit('setMounted');
  }
};

export const getters = {
  editions: s => s.editions,
  loading: s => s.loading,
  error: s => s.error
};
