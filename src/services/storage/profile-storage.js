import BaseStorageModel from "./base";

class ProfileStorage extends BaseStorageModel{
  constructor() {
    super();

    this.setStorageName('profile-storage');
  }
}

export default new ProfileStorage();