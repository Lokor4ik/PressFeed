import ArticleAPI from '../services/ArticleDataService';

export const state = () => ({
  articles: [],
  error: ''
});

export const mutations = {
  setArticles(state, articles) {
    state.articles = articles;
  },
  setError(state, error) {
    state.error = error;
  }
};

export const actions = {
  async fetch({ commit }) {
    try {
      const { data: articles } = await ArticleAPI.getAllArticles();

      commit('setArticles', articles);
    } catch (err) {
      const error = err.response && err.response.data
        ? err.response.data.message
        : 'Oops! Something went wrong.';

      commit('setError', error);
    }
  }
};

export const getters = {
  articles: s => s.articles,
  error: s => s.error
};
