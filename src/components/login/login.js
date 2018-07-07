const { ipcRenderer } = window.require('electron');
import { GOOGLE_AUTH_URL } from "../../index.constants";

export default {
  data() {
    return {
      googleAuthUrl: GOOGLE_AUTH_URL
    };
  },

  methods: {
    login() {
      ipcRenderer.send('login');
    }
  }
};