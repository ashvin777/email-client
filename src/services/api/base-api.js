import MessageBus from '../../index.bus';
import TokenStorage from '../storage/token-storage';
import { EVENTS } from '../../index.constants';

export default class BaseApi {
  constructor() {
    this.BASE_URL = 'https://www.googleapis.com/gmail/v1/users';
    this.USERID = 'me';
    this.BASE_PATH = '';
  }

  setBasePath(path) {
    this.BASE_PATH = path;
  }

  _interceptor(res) {

    if (res.status === 401 || ( res.error &&res.error.code === 401)) {
      MessageBus.$emit(EVENTS.UNAUTHORIZED);
      throw res;
    }

    return res;
  }

  _generateUrl(resourceId) {
    if (resourceId) {
      return `${this.BASE_URL}/${this.USERID}/${this.BASE_PATH}/${resourceId}?`;
    } else {
      return `${this.BASE_URL}/${this.USERID}/${this.BASE_PATH}?`;
    }
  }

  get(resourceId, query) {
    let url = this._generateUrl(resourceId);

    if (query && query.constructor === Object) {
      Object.keys(query).forEach(key => {
        if (query[key] instanceof Array) {
          query[key].forEach(param => {
            url += `${key}=${param}&`;
          });
        } else {
          url += `${key}=${query[key]}&`;
        }
      });
    }

    return fetch(url, {
      headers: {
        Authorization: `Bearer ${TokenStorage.getParsed().access_token}`
      }
    })
      .then(res => res.json())
      .then(this._interceptor.bind(this))
      .catch(this._interceptor.bind(this));
  }

  create() {

  }

  update() {

  }

  delete() {

  }
}
