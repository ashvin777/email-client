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

    let labelThreadsLoaded = 0;

    Gmail.fetchProfile()
      .then(Gmail.fetchLabels.bind(this))
      .then(labels => {

        Object.keys(LABELS).forEach(key => {
          let label = LABELS[key];
          Gmail.fetchThreadsByLabel(label).then(res => {
            labelThreadsLoaded++;
            console.log(res);

            if (labelThreadsLoaded === Object.keys(LABELS).length) {
              console.log('all label and threads are loaded now');
              this.$router.push(STATES.HOME);
            }
          });
        });
      });
  },
}