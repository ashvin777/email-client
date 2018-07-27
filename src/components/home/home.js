import profileStorage from '../../services/storage/profile-storage';

import Gmail from '../../services/gmail';
import Labels from './labels/labels.vue';
import Messages from './messages/messages.vue';
import Message from './message/message.vue';

export default {

  data() {
    return {
      profile: {},
      label: {},
      thread: null
    };
  },

  components: {
    Labels,
    Messages,
    Message
  },

  mounted() {
    Gmail.getProfile().then(profile => {
      profile.photo = profile.entry.gphoto$thumbnail.$t;
      profile.name = profile.entry.gphoto$nickname.$t;
      profile.emailAddress = profile.data.emailAddress;

      this.profile = profile;
    });

    // let myNotification = new Notification('You have new email', {
    //   body: 'Lorem Ipsum Dolor Sit Amet'
    // })
  },

  methods: {
    onSelectLabel(label) {
      this.thread = {};
      this.label = label;
    },

    onSelectThread(thread) {
      this.thread = thread;
    }
  }
};