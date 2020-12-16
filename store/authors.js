import AuthorAPI from '../services/AuthorDataService';

export const state = () => ({
  allMonths: [],
  loading: false,
  authors: [],
  error: ''
});

export const mutations = {
  setAllMonths(state, allMonths) {
    state.allMonths = allMonths;
  },
  setAuthors(state, authors) {
    state.authors = authors;
  },
  setLoading(state) {
    state.loading = !state.loading;
  },
  setError(state, error) {
    state.error = error;
  }
};

export const actions = {
  async fetchMonths({ commit }, body) {
    try {
      const { data } = await AuthorAPI.getAllMonths(body);

      commit('setAllMonths', data);
    } catch (err) {
      const error = err.response && err.response.data
        ? err.response.data.message
        : 'Oops! Something went wrong.';

      commit('setError', error);
    }
  },
  async fetchAuthors({ commit }, body) {
    try {
      commit('setLoading');

      const { data } = await AuthorAPI.getAuthors(body);

      commit('setAuthors', data);
      commit('setLoading');
    } catch (err) {
      const error = err.response && err.response.data
        ? err.response.data.message
        : 'Oops! Something went wrong.';

      commit('setError', error);
    }
  }
};

export const getters = {
  allMonths: s => s.allMonths,
  authors: s => s.authors,
  loading: s => s.loading,
  error: s => s.error
};
