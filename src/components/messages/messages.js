import GoogleApi from '../../services/google';

export default {

  data() {
    return {
      messages: [],
      selected: {
        result: {}
      }
    };
  },

  async mounted() {
    this.messages = await GoogleApi.getMessages('INBOX');
  },

  methods: {
    select(message) {
      this.selected = message;
    }
  }
}