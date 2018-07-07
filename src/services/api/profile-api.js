import BaseApi from "./base-api";

class ProfileApi extends BaseApi{
  constructor() {
    super();

    this.setBasePath('profile');
  }

  getMoreDetails(emailAddress) {
    return fetch(`http://picasaweb.google.com/data/entry/api/user/${emailAddress}?alt=json`).then(res => res.json());
  }
}

export default new ProfileApi();