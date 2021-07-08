<template>
  <v-text-field
    :label="label"
    v-model="value"
    outlined
    @blur="syncToCurrentItem"
  />
</template>

<script>
import { actionTypes } from "@/store/modules/app";

export default {
  name: "CrmFormItem",
  props: {
    field: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.value = this.currentItem[this.field];
  },
  computed: {
    currentItem() {
      return this.$store.state.app.currentItem;
    },
    label() {
      let result = "";
      for (const header of this.$store.state.app.headers) {
        if (header.value == this.field) {
          result = header.text;
          break;
        }
      }
      return result;
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
      newCurrentItem[this.field] = this.value;
      this.$store.dispatch(actionTypes.setCurrentItem, newCurrentItem);
    },
  },
  watch: {
    currentItem() {
      this.value = this.currentItem[this.field];
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