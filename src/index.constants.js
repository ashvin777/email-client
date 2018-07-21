export const STATES = {
  HOME: '/home',
  LOGIN: '/login',
  LOADING: '/loading',
  COMPOSE: '/compose'
};

export const EVENTS = {
  UNAUTHORIZED: 'unauthorized'
};

export const MESSAGE_MIMES = {
  TEXT: {
    PLAIN: 'text/plain', //for client which doesn't support HTML
    HTML: 'text/html'
  },
  MULTIPART: {
    ALTERNATIVE: 'multipart/alternative', //include both plain and HTML
    MIXED: 'multipart/mixed', //include text/html and attachments
    RELATED: 'multipart/related' // have multiple multiparts - attachments case
  }
};

export const CATEGORY_IDS = {
  PRIMARY: 'primary',
  FORUMS: 'forums',
  PROMOTIONS: 'promotions',
  SOCIAL: 'social',
  UPDATES: 'updates'
};


export const LABELS = {
  INBOX: 'inbox',
  DRAFT: 'draft',
  SENT: 'sent',
  IMPORTANT: 'important',
  UNREAD: 'unread',
  SPAM: 'spam',
  TASH: 'trash',
  STARRED: 'starred'
};

export const CATEGORIES = [{
  name: 'Primary',
  id: CATEGORY_IDS.PRIMARY
},{
  name: 'Updates',
  id: CATEGORY_IDS.UPDATES
},{
  name: 'Promotions',
  id: CATEGORY_IDS.PROMOTIONS
},{
  name: 'Social',
  id: CATEGORY_IDS.SOCIAL
},{
  name: 'Forums',
  id: CATEGORY_IDS.FORUMS
}];




/*

payload {
  body: {
    data: '' //for plain or html type above
  },
  mimeType : plain/html/multipart,

  parts : [{
    mimetype: plain/html/multipart(alternative/mixed/related)
    ..
    plain //if html not supported by client then use this as fallback
    ..
    parts: [{
      mimetype: plain/html/multipart //if above parts is related
    }]
  }]
}

other parts are - application/msword,
*/