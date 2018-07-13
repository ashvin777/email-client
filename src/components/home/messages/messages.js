import threadsApi from "../../../services/api/threads-api";
import {
  MESSAGE_MIMES,
  CATEGORIES
} from "../../../index.constants";

import InfiniteLoading from 'vue-infinite-loading';

const { ipcRenderer } = window.require('electron');

export default {
  props: ['label'],

  components: {
    InfiniteLoading
  },

  data() {
    return {
      threads: [],
      threadsTemp: [],
      selected: {},
      categories: CATEGORIES,
      selectedCategory: CATEGORIES[0],
      busy: false,
      nextPageToken: ''
    };
  },

  filters: {
    from(value) {
      return value.replace(/\s<.*>$/, '');
    }
  },

  watch: {
    label() {
      this.reloadThreads()
    }
  },

  mounted() {
    ipcRenderer.send('threads');
    ipcRenderer.on('threads', (evt, payload) => {
      this.threads = payload;
    });
  },

  methods: {

    reloadThreads() {
      // this.nextPageToken = '';
      // this.threads = [];
      // setTimeout(() => {
      //   this.$refs.infiniteLoading.attemptLoad();
      // }, 1000);
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

    isMimeMixedType(thread) {
      if (thread.messages) {
        return thread.messages.some(message => message.payload.mimeType === MESSAGE_MIMES.MULTIPART.MIXED);
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
      this.reloadThreads();
    },

    getThreadParams() {
      return {
        labelIds: [this.label.id],
        labeRIds: 20,
        pageToken: this.nextPageToken,
        format: 'FULL',
        q: `category:${this.selectedCategory.id}`
      };
    },

    getAllThreads() {
      // return threadsApi.get(null, this.getThreadParams()).then(res => {
      //   if (res.nextPageToken && res.threads) {
      //     this.nextPageToken = res.nextPageToken;
      //     res.threads.forEach(thread => {
      //       this.threads.push(thread);
      //       this.getThreadMessages(thread, this.threads.length - 1);
      //     });
      //     return res;
      //   } else {
      //     throw new Error('No data available');
      //   }
      // });
      // this.threadsTemp.push(this.threads);
    },

    getThreadMessages(thread, index) {
      return threadsApi.get(thread.id).then(res => {
        if (res && res.messages) {
          res.messages = res.messages.map(message => {
            let headers = {};
            message.payload.headers.forEach(header => {
              headers[header.name] = header.value;
            });
            delete message.payload.headers;
            message.headers = headers;
            return message;
          });
          thread = res;
          this.$set(this.threads, index, thread);
        }
      });
    },

    loadMore($state) {
      setTimeout(() => {
        if (this.label && this.label.id) {
          // this.getAllThreads();//.then(() => $state.loaded());//.catch(()=> $state.complete());
        }
      }, 1000);
    }
  }
};