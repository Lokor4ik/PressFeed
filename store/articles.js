import ArticleAPI from '../services/ArticleDataService';

export const state = () => ({
  articles: [],
  article: {},
  fetchedArticles: [],
  query: {
    page: 0,
    size: 10
  },
  error: ''
});

export const mutations = {
  setArticles(state, articles) {
    state.articles = [...state.articles, ...articles];
    state.fetchedArticles = [...articles];
  },
  setArticle(state, article) {
    state.article = article;
  },
  setQuery(state, stepPage) {
    state.query = {
      ...state.query,
      page: state.query.page += stepPage
    };
  },
  setError(state, error) {
    state.error = error;
  }
};

export const actions = {
  async fetchAllArticles({ commit, state }) {
    try {
      const { data: articles } = await ArticleAPI.getAllArticles(state.query);

      commit('setArticles', articles);
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
  },
  putQuery({ commit }, stepPage) {
    commit('setQuery', stepPage);
  }
};

export const getters = {
  articles: s => s.articles,
  article: s => s.article,
  fetchedArticles: s => s.fetchedArticles,
  query: s => s.query,
  error: s => s.error
};
