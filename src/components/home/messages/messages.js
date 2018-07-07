import threadsApi from "../../../services/api/threads-api";

export default {
  props: ['label'],

  data() {
    return {
      threads: [],
      selected: {}
    };
  },

  filters: {
    from(value) {
      return value.replace(/<.*>$/, '');
    }
  },

  watch: {
    label() {
      this.loadMessages();
    }
  },

  mounted() {
    this.loadMessages();
  },

  methods: {
    loadMessages() {
      threadsApi.get().then(res => {
        res.threads.forEach((thread, index) => {
          threadsApi.get(thread.id).then(res => {
            res.messages = res.messages.map(message => {
              let headers = {};
              message.payload.headers.forEach(header => {
                headers[header.name] = header.value;
              });
              message.headers = headers;
              return message;
            });

            this.threads[index] = res;
          });
        });
      });
    },

    select(thread) {
      this.selected = thread;
    },

    isUnread(thread) {
      return thread.messages.some(message => {
        return message.labelIds.indexOf('UNREAD') !== -1;
      });
    }
  }
};