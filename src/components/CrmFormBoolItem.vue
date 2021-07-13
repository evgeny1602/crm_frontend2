<template>
  <v-select :items="items" :label="header.text" v-model="select" />
</template>

<script>
export default {
  name: "CrmFormBoolItem",
  props: {
    header: { type: Object, required: true },
    initVal: { type: Boolean, required: true },
  },
  data() {
    return {
      items: ["Да", "Нет"],
      select: null,
    };
  },
  mounted() {
    this.select = this.initVal ? this.items[0] : this.items[1];
  },
  watch: {
    initVal(newValue, oldValue) {
      if (oldValue == newValue) {
        return;
      }
      this.select = this.initVal ? this.items[0] : this.items[1];
    },
    select(newValue, oldValue) {
      if (!oldValue) {
        return;
      }
      if (oldValue == newValue) {
        return;
      }
      this.$emit("itemChanged", {
        header: this.header,
        itemVal: this.select == this.items[0] ? true : false,
      });
    },
  },
};
</script>