import { STATES } from '../../index.constants';
import Gmail from '../../services/gmail';

export default {
  methods: {
    login() {
      Gmail.login().then(res => {
        this.$router.push(STATES.LOADING);
      });
    }
  }
};