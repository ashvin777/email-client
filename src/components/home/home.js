import GoogleApi from '../../services/google';
import LabelsComponent from '../labels/labels.vue';
import MessagesComponent from '../messages/messages.vue';
import MessageDetailsComponent from '../message-details/message-details.vue';
import { LABELS } from '../../consts';

export default {

  components: {
    LabelsComponent,
    MessagesComponent,
    MessageDetailsComponent
  },

  data() {
    return {
      selectedLabel: LABELS.INBOX,
      selectedMessage: {
        result: {}
      }
    }
  },

  methods: {
    login() {
      GoogleApi.login();
    }
  }
}