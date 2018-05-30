/* global gapi */
import { GOOGLE_API } from './index.constants';

export default function runBlock($log) {
  'ngInject';
  $log.debug('runBlock end');

  gapi.load('client:auth2', () => {
    gapi.client.init({
      discoveryDocs: GOOGLE_API.DISCOVERY_DOCS,
      clientId: GOOGLE_API.CLIENT_ID,
      scope: GOOGLE_API.SCOPES
    });
  });
}
