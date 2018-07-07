import {
  LABELS
} from '../../consts';

export default {
  name: 'LabelsComponent',

  props: ['selectedLabel'],

  data() {
    return {
      labels: LABELS
    };
  },

  methods: {
    select(label) {
      this.$emit('update', label);
    }
  }
};