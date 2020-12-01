import http from '../utils/http-common';

class ArticleAPI {
  static getAllArticles({ page, size }) {
    return http.get(`/articles?page=${page}&size=${size}`);
  }
}

export default ArticleAPI;
