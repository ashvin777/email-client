import BaseApi from "./base-api";
import axios from 'axios';

class ProfileApi extends BaseApi{
  constructor() {
    super();

    this.setBasePath('profile');
  }

  getMoreDetails(emailAddress) {
    return axios.get(`http://picasaweb.google.com/data/entry/api/user/${emailAddress}?alt=json`);
  }
}

export default new ProfileApi();