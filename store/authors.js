import AuthorAPI from '../services/AuthorDataService';

export const state = () => ({
  allMonths: [],
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
      const { data } = await AuthorAPI.getAuthors(body);
      console.log(data)
      commit('setAuthors', data);
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
  error: s => s.error
};
