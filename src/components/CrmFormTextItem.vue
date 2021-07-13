<template>
  <v-text-field :label="header.text" v-model="value" />
</template>

<script>
export default {
  name: "CrmFormTextItem",
  props: {
    header: {
      type: Object,
      required: true,
    },
    initVal: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.value = this.initVal;
  },
  data() {
    return {
      value: null,
    };
  },
  watch: {
    initVal(newVal, oldVal) {
      if (oldVal === newVal) {
        return;
      }
      this.value = this.initVal;
    },
    value(newVal, oldVal) {
      if (oldVal === null) {
        return;
      }
      if (oldVal == newVal) {
        return;
      }
      this.$emit("itemChanged", { header: this.header, itemVal: this.value });
    },
  },
};
</script>