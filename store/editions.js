import EditionAPI from '../services/EditionsDataService';

export const state = () => ({
  editions: [],
  error: ''
});

export const mutations = {
  setEditions(state, editions) {
    state.editions = editions;
  },
  setError(state, error) {
    state.error = error;
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
  }
};

export const getters = {
  editions: s => s.editions,
  error: s => s.error
};
