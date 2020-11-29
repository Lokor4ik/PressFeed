import http from '../utils/http-common';

class ArticleAPI {
  static getAllArticles() {
    return http.get('/articles');
  }
}

export default ArticleAPI;
