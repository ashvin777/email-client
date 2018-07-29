import {
  MESSAGE_MIMES,
  CATEGORIES,
  LABELS,
  CATEGORY_IDS
} from "../../../index.constants";

import Gmail from '../../../services/gmail';

export default {
  props: ['label'],

  data() {
    return {
      threads: [],
      selected: {},
      labels : LABELS
    };
  },

  filters: {
    from(value) {
      return value.replace(/\s<.*>$/, '');
    }
  },

  watch: {
    label(label) {
      this.getThreads(label.id);
    }
  },

  methods: {

    getThreads(labelId) {
      Gmail.getThreads(labelId).then(res => {
        this.threads = res.threads;
      });
    },

    select(thread) {
      this.selected = thread;
      this.$emit('select', thread);
    },

    isUnread(thread) {
      if (thread.messages) {
        return thread.messages.some(message => message.labelIds.indexOf('UNREAD') !== -1);
      }
    },

    isAttachment(thread) {
      return thread.messages.some(message => {
        return message.attachments && message.attachments.length > 0;
      });
    },

    getCategory(thread) {
      if (thread.messages && thread.messages[0]) {
        let labelIds = thread.messages[0].labelIds;
        let category = labelIds.filter(label => label.match(/^CATEGORY_/));
        if (category && category.length > 0) {
          category = category[0];
          category = category.replace(/CATEGORY_/, '');
          return category;
        }
      }
    }

  }
};