import BaseApi from "./base-api";

class LabelsApi extends BaseApi{
  constructor() {
    super();

    this.setBasePath('labels');
  }
}

export default new LabelsApi();