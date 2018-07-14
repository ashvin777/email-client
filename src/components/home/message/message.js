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
          try {
            this.messageDOM.innerHTML = this.getBody(payload.messages[0].payload.parts[1].body.data);
          } catch (e) {

          }
        });
      }
    }
  },

  mounted() {
    this.messageDOM = this.$refs.message.attachShadow({
      mode: 'open'
    });
  },

  methods: {
    getBody(message) {
      return atob(message.replace(/_/g, '/').replace(/-/g, '+'));
    }
  }
};