import threadsApi from "../../../services/api/threads-api";
import {
  MESSAGE_MIMES,
  CATEGORIES,
  CATEGORY_IDS
} from "../../../index.constants";
import InfiniteLoading from 'vue-infinite-loading';

export default {
  props: ['label'],

  components: {
    InfiniteLoading
  },

  data() {
    return {
      threads: {},
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
      //this.loadMessages();
      this.threads = {};
      this.loadMore();
    }
  },

  mounted() {
    //this.loadMessages();
  },

  methods: {

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
      //this.loadMessages();
    },

    getThreadParams() {
      let params = {};

      params.labelIds = [this.label.id];
      params.maxResults = 5;
      params.nextPageToken = this.nextPageToken;
      if (this.selectedCategory.id !== CATEGORY_IDS.PRIMARY) {
        params.labelIds.push(this.selectedCategory.id);
      } else {
        params.q = ' -category:(updates OR promotions OR social OR forums)';
      }

      console.log(params);
      return params;
    },

    getAllThreads() {
      return threadsApi.get(null, this.getThreadParams()).then(res => {
        this.nextPageToken = res.data.nextPageToken;
        console.log('TOKEN ', res.data.nextPageToken);
        res.data.threads.forEach(thread => {
          this.$set(this.threads, thread.id, thread);
        });
        return res;
      });
    },

    getThreadMessages(thread) {
      return threadsApi.get(thread.id).then(res => {
        if (res.data && res.data.messages) {
          res.data.messages = res.data.messages.map(message => {
            let headers = {};
            message.payload.headers.forEach(header => {
              headers[header.name] = header.value;
            });
            delete message.payload.headers;
            message.headers = headers;
            return message;
          });
          thread = res.data;
        }
      });
    },

    loadMore($state) {
      //setTimeout(() => {
        //console.log('load more----------------');
        if (this.label && this.label.id) {
          //this.getAllThreads().then(() => $state.loaded());
        }
      //}, 1000);
    }
  }
};