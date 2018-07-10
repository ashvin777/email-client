import profileApi from "../../services/api/profile-api";

import profileStorage from '../../services/storage/profile-storage';

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

    profileApi.get().then(res => {
      profileApi.getMoreDetails(res.emailAddress).then(more => {
        let profile = res;
        profile.photo = more.data.entry.gphoto$thumbnail.$t;
        profile.name = more.data.entry.gphoto$nickname.$t;
        this.profile = profile;
        profileStorage.set(profile);
      });
    });
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