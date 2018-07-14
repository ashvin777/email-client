import { STATES } from './index.constants';
import Gmail from './services/gmail';

export default {
  mounted() {

    Gmail.isTokenLoaded().then(() => {
      this.$router.push(STATES.HOME);
    }).catch(() => {
      this.$router.push(STATES.LOGIN);
    });
  }
};