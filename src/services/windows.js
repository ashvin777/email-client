const { ipcRenderer } = window.require('electron');

const EVENTS = {
  COMPOSE: 'compose'
};

class Windows {

  compose() {
    ipcRenderer.send(EVENTS.COMPOSE);
  }
}

export default new Windows();