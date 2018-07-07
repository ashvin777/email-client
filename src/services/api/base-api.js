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
    if (!res.ok && res.status === 401) {
      MessageBus.$emit(EVENTS.UNAUTHORIZED);
      throw res.json();
    }

    return res;
  }

  _generateUrl(resourceId) {
    if (resourceId) {
      return `${this.BASE_URL}/${this.USERID}/${this.BASE_PATH}/${resourceId}`;
    } else {
      return `${this.BASE_URL}/${this.USERID}/${this.BASE_PATH}`;
    }
  }

  get(resourceId, options) {
    let url = this._generateUrl(resourceId, options);

    return fetch(`${url}?maxResults=30`, {
      headers: {
        Authorization: `Bearer ${TokenStorage.getParsed().access_token}`
      }
    })
      .then(this._interceptor.bind(this))
      .then(res => res.json());
  }

  create() {

  }

  update() {

  }

  delete() {

  }
}
