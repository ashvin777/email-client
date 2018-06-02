import GoogleApi from '../../services/google';
import { LABELS } from '../../consts';

export default {

  props: ['selectedMessage', 'label'],

  data() {
    return {
      messages: []
    };
  },

  watch: {
    async label(newLabel) {
      await this.loadMessages(newLabel.key);
    }
  },

  mounted () {
    this.loadMessages(this.label.key);
  },

  methods: {
    select(message) {
      this.$emit('update', message);
    },

    isUnread(labelIds) {
      if (labelIds instanceof Array) {
        // console.log(labelIds);
        return labelIds.indexOf(LABELS.UNREAD.key) !== -1;
      }
    },

    async loadMessages(key) {
      this.messages = [];
      this.messages = await GoogleApi.getMessages(key);
    }
  }
}