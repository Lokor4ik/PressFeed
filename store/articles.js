import ArticleAPI from '../services/ArticleDataService';

export const state = () => ({
  articles: [],
  count: 0,
  article: {},
  page: 1,
  size: 10,
  error: ''
});

export const mutations = {
  setArticles(state, { data, page }) {
    state.articles = [...data.rows];
    state.page = page;
    state.count = data.count;
  },
  setArticle(state, article) {
    state.article = article;
  },
  setError(state, error) {
    state.error = error;
  }
};

export const actions = {
  async fetchAllArticles({ commit, state }, page) {
    try {
      const { data } = await ArticleAPI.getAllArticles({ page, size: state.size });

      commit('setArticles', { data, page });
    } catch (err) {
      const error = err.response && err.response.data
        ? err.response.data.message
        : 'Oops! Something went wrong.';

      commit('setError', error);
    }
  },
  async fetchCurrentArticle({ commit }, id) {
    try {
      const { data: article } = await ArticleAPI.getCurrentArticle(id);

      commit('setArticle', article);
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
  article: s => s.article,
  page: s => s.page,
  count: s => s.count,
  error: s => s.error
};
