import { LABELS, LABEL_IDS } from "./labels.const";
import Windows from '../../../services/windows';

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
  },

  methods: {
    select(label){
      this.selectedLabel = label;
      this.$emit('select', label);
    },

    compose() {
      Windows.compose();
    }
  }
};