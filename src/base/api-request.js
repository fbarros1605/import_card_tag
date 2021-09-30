const request = require('async-request');
const config = require('../../config/index');

class ApiRequest {

  async callWS(verb, url, param) {

    const req = {
      method: verb,
      headers: {
        'content-type': 'application/json',
        Authorization: config.auth,
      },
      data: param ?? {}
    };

    let ret;
    try {
      const response = await request(url, req);

      if (
        response.statusCode === 200 ||
        response.statusCode === 201 ||
        response.statusCode === 204
      ) {
        ret = JSON.parse(response.body);
        ret.statusCode = response.statusCode;
      } else {
        let message = '';
        let statusCode = 500;
        if (typeof response === 'object' && response.hasOwnProperty('statusCode')) {
          statusCode = response.statusCode;
        }

        if (response.detail) {
          message = response.detail;
        } else {
          message = 'Ocorreu um erro inesperado!';
        }

        ret = {
          statusCode,
          body: message,
        };
      }
    } catch (ex) {
      ret = ex;
    }

    return ret;
  }

  async get(url) {
    return this.callWS('GET', url);
  }

  async post(url, params) {
    return this.callWS('POST', url, params);
  }

  async delete(url, params) {
    return this.callWS('DELETE', url, params);
  }

  async put(url, params) {
    return this.callWS('PUT', url, params);
  }

  async patch(url, params) {
    return this.callWS('PATCH', url, params);
  }
}

module.exports = ApiRequest;

