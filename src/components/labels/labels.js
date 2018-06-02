import {
  LABELS
} from '../../consts';

export default {
  name: 'LabelsComponent',

  props: ['selectedLabel'],

  data() {
    return {
      selected: ''
    };
  },

  watch: {
    selectedLabel(label) {
      this.selected = label;
    }
  },

  methods: {
    select(label) {
      this.selected = label;
    }
  }
}