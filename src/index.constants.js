export const STATES = {
  HOME: '/home',
  LOGIN: '/login'
};

export const GOOGLE_AUTH_PARAMS = {
  CLIENT_ID: '991950553812-a8obm2p8obi1nnmq0og8t7ljivvv0kvo.apps.googleusercontent.com',
  SCOPES: 'https://mail.google.com/',
  REDIRECT_URL: 'http://localhost:64636',
  DISCOVERY_DOCS: "[\"https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest\"]"
};

export const GOOGLE_AUTH_URL =
  `https://accounts.google.com/o/oauth2/auth?` +
  `scope=${GOOGLE_AUTH_PARAMS.SCOPES}&`+
  `client_id=${GOOGLE_AUTH_PARAMS.CLIENT_ID}&` +
  `redirect_uri=${GOOGLE_AUTH_PARAMS.REDIRECT_URL}&` +
  `response_type=token&` +
  `DISCOVERY_DOCS=${GOOGLE_AUTH_PARAMS.DISCOVERY_DOCS}`;


export const EVENTS = {
  UNAUTHORIZED: 'unauthorized'
};