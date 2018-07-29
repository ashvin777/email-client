import { STATES } from './index.constants';
import Gmail from './services/gmail';

export default {
  mounted() {

    if (this.$route.path === `/${STATES.COMPOSE}`) {
      this.$router.push(STATES.COMPOSE);
    } else {
      Gmail.isTokenLoaded().then(() => {
        this.$router.push(STATES.HOME);
      }).catch(() => {
        this.$router.push(STATES.LOGIN);
      });
    }
  }
};