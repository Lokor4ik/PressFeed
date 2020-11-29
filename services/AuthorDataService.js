import http from '../utils/http-common';

class AuthorAPI {
  static getAllMonths(data) {
    return http.post('/allMonths', data);
  }

  static getAuthors(data) {
    return http.post('/authors', data);
  }
}

export default AuthorAPI;
