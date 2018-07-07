import GoogleApi from '../../services/google';

export default {

  props: ['selectedMessage'],

  data() {
    return {
      messageDetails: {}
    };
  },

  watch: {
    async selectedMessage(message) {
      this.messageDetails = await GoogleApi.getMessageDetails(message.result.id);
      this.messageDOM.innerHTML = this.messageDetails.result.payload.parts[1];
    }
  },

  async mounted() {
    this.messageDOM = this.$refs.message.attachShadow({
      mode: 'open'
    });
  }
}