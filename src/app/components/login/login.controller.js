import { GOOGLE_API } from '../../index.constants';

export default class LoginComponent {
  constructor() {
    'ngInject';
  }

  login() {
    gapi.load('client:auth2', this.initClient);
  }

  initClient() {
    gapi.client.init({
      clientId: GOOGLE_API.CLIENT_ID,
      scope: GOOGLE_API.SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // // Handle the initial sign-in state.
      // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      // authorizeButton.onclick = handleAuthClick;
      // signoutButton.onclick = handleSignoutClick;
    });
  }
}