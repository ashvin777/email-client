import TokenStorage from './services/storage/token-storage';
const { ipcRenderer } = window.require('electron');

import {
  STATES, EVENTS
} from './index.constants';
import MessageBus from './index.bus';

export default {

  mounted() {
    this.navigate();

    ipcRenderer.on('token', this.onTokenReceived.bind(this));
    MessageBus.$on(EVENTS.UNAUTHORIZED, this.onUnAuthorization.bind(this));
  },

  methods: {

    onTokenReceived(event, payload) {
      TokenStorage.set(JSON.parse(payload));
      this.navigate();
    },

    navigate() {
      let hash = TokenStorage.getParsed();

      if (hash && typeof hash === 'object' && hash.access_token) {
        this.$router.push(STATES.HOME);
      } else {
        this.$router.push(STATES.LOGIN);
      }
    },

    onUnAuthorization() {
      this.$router.push(STATES.LOGIN);
      TokenStorage.clear();
    }
  }
};