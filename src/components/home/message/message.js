import Gmail from '../../../services/gmail';

export default {
  props: ['thread'],

  data() {
    return {
      threadDetails: {},
      style: `
      <style>
      :shadow-root, :host {
        all: initial;
      }
      </style>`
    };
  },

  watch: {
    thread() {
      if (this.thread) {
        this.threadDetails = {};
        Gmail.getThreadDetails(this.thread.id).then((res) => {
          this.threadDetails = res;

          if (res.messages) {
            setTimeout(() => {
              res.messages.forEach(message => {
                if (this.isTextHTML(message)) {
                  let dom = this.attachShadow(message.id);
                  dom.innerHTML = message.textHtml + this.style;
                }
              });
            });
          }
        });
      }
    }
  },

  methods: {

    isAttachment(message) {
      return message.attachments && message.attachments.length > 0;
    },

    isTextHTML(message) {
      return typeof message.textHtml !== 'undefined';
    },

    attachShadow(ref) {
      return this.$refs[ref][0].attachShadow({
        mode: 'closed'
      });
    },

    getBody(message) {
      return atob(message.replace(/_/g, '/').replace(/-/g, '+'));
    }
  }
};