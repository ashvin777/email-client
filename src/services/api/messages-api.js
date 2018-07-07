import BaseApi from "./base-api";

class MessagesApi extends BaseApi{
  constructor() {
    super();

    this.setBasePath('messages');
  }
}

export default new MessagesApi();