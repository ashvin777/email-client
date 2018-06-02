import GoogleApi from '../../services/google';
import { setTimeout } from 'timers';

export default {

  data() {
    return {
      messageDetails: {}
    };
  },

  async mounted() {

     setTimeout(async () => {
    // debugger;
      let shadowDOM = this.$el.querySelector('#message').attachShadow({ mode: 'open' });

      let id = '163c0429ed37a834';
      this.messageDetails = await GoogleApi.getMessageDetails(id);
      console.log(this.messageDetails.result.payload.parts[1]);

      shadowDOM.innerHTML = this.messageDetails.result.payload.parts[1];
     }, 2000);
  },

  methods: {

  }
}