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
      labels : LABELS,
      selectedCategory: CATEGORIES[0],
      categories: CATEGORIES
    };
  },

  filters: {
    from(value) {
      return value.replace(/\s<.*>$/, '');
    }
  },

  watch: {
    label(label) {
      if (this.label.id.toLowerCase() === this.labels.INBOX) {
        this.getThreads(this.label.id, this.selectedCategory.id);
      } else {
        this.getThreads(this.label.id);
      }
    }
  },

  methods: {

    getThreads(label, category) {
      console.log(label, category);
      Gmail.getThreads({ label, category }).then(res => {
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

    isMimeTypeRelated(thread) {
      if (thread.messages) {
        return thread.messages.some(message => message.payload.mimeType === MESSAGE_MIMES.MULTIPART.RELATED);
      }
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
    },

    selectCategory(category) {
      this.selectedCategory = category;
      this.getThreads(this.label.id, category.id);
    }

  }
};