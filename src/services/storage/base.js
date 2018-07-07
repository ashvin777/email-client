export default class BaseStorageModel {

  constructor() {
    this.STORAGE_NAME = '';
  }

  setStorageName(storageName) {
    this.STORAGE_NAME = storageName;
  }

  set(model) {
    localStorage.setItem(this.STORAGE_NAME, JSON.stringify(model));
  }

  get() {
    let storedData = localStorage.getItem(this.STORAGE_NAME);
    return storedData;
  }

  getParsed() {
    let storedData = localStorage.getItem(this.STORAGE_NAME);
    return storedData ? JSON.parse(storedData) : null;
  }

  clear() {
    localStorage.removeItem(this.STORAGE_NAME);
  }
}
