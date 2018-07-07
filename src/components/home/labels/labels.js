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
    this.select(LABELS[0]);
    labelsApi.get(LABEL_IDS.INBOX).then(res => {
      this.labels[0].unread = res.messagesUnread;
    });
  },

  methods: {
    select(label){
      this.selectedLabel = label;
      this.$emit('select', label);
    }
  }
};