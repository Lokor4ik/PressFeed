import http from '../utils/http-common';

class EditionAPI {
  static getOftenEditions() {
    return http.get('/editions');
  }
}

export default EditionAPI;
