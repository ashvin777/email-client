const { ipcRenderer } = window.require('electron');

const EVENTS = {
  FETCH_THREADS: 'fetch-threads',
  GET_THREADS: 'get-threads',
  GET_THREAD_DETAILS: 'get-thread-details',
  FETCH_PROFILE: 'fetch-profile',
  GET_PROFILE: 'get-profile',
  IS_TOKEN_LOADED: 'is-token-loaded',
  LOGIN: 'login',
  SEND: 'send',
  SYNC: 'sync'
};

class Gmail {

  login() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send(EVENTS.LOGIN);
      ipcRenderer.once(EVENTS.LOGIN, () => {
        resolve();
      });
    });
  }

  startSync() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send(EVENTS.SYNC);
      ipcRenderer.once(EVENTS.SYNC, (event, payload) => {
        if (payload && payload.error) {
          reject('Failed to load profile');
          return;
        }
        resolve();
      });
    });
  }

  isTokenLoaded() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send(EVENTS.IS_TOKEN_LOADED);
      ipcRenderer.once(EVENTS.IS_TOKEN_LOADED, (event, payload) => {
        if (payload.error) {
          reject('Failed to load profile');
          return;
        }
        resolve();
      });
    });
  }

  fetchProfile() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send(EVENTS.FETCH_PROFILE);
      ipcRenderer.once(EVENTS.FETCH_PROFILE, (event, payload) => {
        if (payload.error) {
          reject('Failed to load profile');
          return;
        }
        resolve(payload);
      });
    });
  }

  fetchThreads(data) {
    return new Promise((resolve) => {
      ipcRenderer.send(EVENTS.FETCH_THREADS, data);
    });
  }

  getProfile() {
    return new Promise((resolve, reject) => {
      ipcRenderer.send(EVENTS.GET_PROFILE);
      ipcRenderer.once(EVENTS.GET_PROFILE, (event, payload) => {
        if (payload.error) {
          reject('Failed to load profile');
          return;
        }
        resolve(payload);
      });
    });
  }

  getThreads(data) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send(EVENTS.GET_THREADS, data);
      ipcRenderer.once(EVENTS.GET_THREADS, (event, payload) => {
        if (payload.error) {
          reject('Failed to load thread');
          return;
        }
        resolve(payload);
      });
    });
  }

  getThreadDetails(data) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send(EVENTS.GET_THREAD_DETAILS, data);
      ipcRenderer.once(EVENTS.GET_THREAD_DETAILS, (event, payload) => {
        if (payload.error) {
          reject('Failed to load thread');
          return;
        }
        resolve(payload);
      });
    });
  }

  send(body) {
    return new Promise((resolve, reject) => {
      ipcRenderer.send(EVENTS.SEND, body);
      ipcRenderer.once(EVENTS.SEND, (event, payload) => {
        if (payload.error) {
          reject('Failed to send email');
          return;
        }
        resolve(payload);
      });
    });
  }
}

export default new Gmail();