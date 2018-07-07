import BaseStorageModel from "./base";

class TokenStorage extends BaseStorageModel{
  constructor() {
    super();

    this.setStorageName('token-storage');
  }
}

export default new TokenStorage();