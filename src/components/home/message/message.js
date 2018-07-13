const { ipcRenderer } = window.require('electron');

export default {
  props: ['thread'],

  data() {
    return {
      threadDetails: {}
    };
  },

  watch: {
    thread() {
      if (this.thread) {
        ipcRenderer.send('thread', this.thread);
        ipcRenderer.on('thread', (evt, payload) => {
          this.threadDetails = payload;
        });
      }
    }
  }
};