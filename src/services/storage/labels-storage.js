import BaseStorageModel from "./base";

class LabelsStorage extends BaseStorageModel{
  constructor() {
    super();

    this.setStorageName('labels-storage');
  }
}

export default new LabelsStorage();