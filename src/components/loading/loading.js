import {
  STATES,
  LABELS,
  CATEGORY_IDS,
  CATEGORIES
} from '../../index.constants';
import Gmail from '../../services/gmail';

export default {

  data() {
    return {
      profile: {}
    };
  },

  mounted() {

    Gmail.startSync().then(() => {
      this.$router.push(STATES.HOME);
    });

    // Gmail.fetchProfile().then(profile => {
    //   this.profile = profile;
    // });

    // Object.keys(LABELS).forEach(index => {
    //   let label = LABELS[index];

    //   if (label === LABELS.INBOX) {
    //     CATEGORIES.forEach(category => {
    //       Gmail.fetchThreads({
    //         label: label,
    //         category: category.id
    //       });
    //     });
    //   } else {
    //     Gmail.fetchThreads({
    //       label: label
    //     });
    //   }
    // });

    // setTimeout(() => {
    //   this.$router.push(STATES.HOME);
    // }, 1000);
  },
}