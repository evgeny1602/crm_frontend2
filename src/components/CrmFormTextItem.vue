<template>
  <v-text-field
    :label="header.text"
    v-model="value"
    outlined
    @blur="syncToCurrentItem"
  />
</template>

<script>
import { actionTypes } from "@/store/modules/app";

export default {
  name: "CrmFormTextItem",
  props: {
    header: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.value = this.currentItem[this.header.value];
  },
  computed: {
    currentItem() {
      return this.$store.state.app.currentItem;
    },
  },
  data() {
    return {
      value: null,
    };
  },
  methods: {
    syncToCurrentItem() {
      let newCurrentItem = { ...this.currentItem };
      newCurrentItem[this.header.value] = this.value;
      this.$store.dispatch(actionTypes.setCurrentItem, newCurrentItem);
    },
  },
  watch: {
    currentItem() {
      this.value = this.currentItem[this.header.value];
    },
    value(newVal, oldVal) {
      if (oldVal === null) {
        return;
      }
      if (oldVal == newVal) {
        return;
      }
      this.syncToCurrentItem();
    },
  },
};
</script>