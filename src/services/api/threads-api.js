import BaseApi from "./base-api";

class ThreadsApi extends BaseApi{
  constructor() {
    super();

    this.setBasePath('threads');
  }
}

export default new ThreadsApi();