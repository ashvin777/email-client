import labelsApi from "../../../services/api/labels-api";

import { LABELS, LABEL_IDS } from "./labels.const";

export default {

  props: ['profile'],

  data() {
    return {
      labels: LABELS,
      selectedLabel: {}
    };
  },

  mounted() {
    labelsApi.get(LABEL_IDS.INBOX).then(res => {
      this.select(LABELS[0]);
      this.labels[0].unread = res.data.messagesUnread;
    });
  },

  methods: {
    select(label){
      this.selectedLabel = label;
      this.$emit('select', label);
    }
  }
};