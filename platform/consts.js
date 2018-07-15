const GOOGLE_AUTH_PARAMS = {
  CLIENT_ID: '991950553812-a8obm2p8obi1nnmq0og8t7ljivvv0kvo.apps.googleusercontent.com',
  SCOPES: 'https://mail.google.com/',
  REDIRECT_URL: 'http://localhost:64636',
  DISCOVERY_DOCS: "[\"https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest\"]"
};

const GOOGLE_AUTH_URL =
  `https://accounts.google.com/o/oauth2/auth?` +
  `scope=${GOOGLE_AUTH_PARAMS.SCOPES}&`+
  `client_id=${GOOGLE_AUTH_PARAMS.CLIENT_ID}&` +
  `redirect_uri=${GOOGLE_AUTH_PARAMS.REDIRECT_URL}&` +
  `response_type=token&` +
  `DISCOVERY_DOCS=${GOOGLE_AUTH_PARAMS.DISCOVERY_DOCS}`;

const EVENTS = {
  FETCH_THREADS: 'fetch-threads',
  GET_THREADS: 'get-threads',
  GET_THREAD_DETAILS: 'get-thread-details',
  FETCH_PROFILE: 'fetch-profile',
  GET_PROFILE: 'get-profile',
  LOGIN: 'login',
  TOKEN: 'token',
  IS_TOKEN_LOADED: 'is-token-loaded'
};

const LABELS = {
  INBOX: 'inbox',
  DRAFT: 'draft',
  SENT: 'sent',
  IMPORTANT: 'important',
  UNREAD: 'unread',
  SPAM: 'spam',
  TASH: 'trash',
  STARRED: 'starred'
};

const CATEGORIES = {
  PRIMARY: 'primary',
  FORUMS: 'forums',
  PROMOTIONS: 'promotions',
  SOCIAL: 'social',
  UPDATES: 'updates'
};

const CACHE = {
  ROOT: './.cache/',
  THREADS: './.cache/threads/',
  METADATA: './.cache/metadata/',
  INBOX: './.cache/inbox/',
  DRAFT: './.cache/draft/',
  SENT: './.cache/sent/',
  IMPORTANT: './.cache/important/',
  UNREAD: './.cache/unread/',
  SPAM: './.cache/spam/',
  TASH: './.cache/trash/',
  STARRED: './.cache/starred/',
  TOKEN: './.cache/token',
  PROFILE: './.cache/profile'
};

const PORT = 64635;

module.exports = {
  GOOGLE_AUTH_URL,
  EVENTS,
  LABELS,
  CACHE,
  PORT,
  CATEGORIES
};