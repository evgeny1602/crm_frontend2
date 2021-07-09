<template>
  <v-select :items="items" :label="header.text" v-model="select" outlined />
</template>

<script>
import { actionTypes } from "@/store/modules/app";

export default {
  name: "CrmFormBoolItem",
  props: {
    header: { type: Object, required: true },
  },
  data() {
    return {
      items: ["Да", "Нет"],
      select: null,
    };
  },
  mounted() {
    this.syncFromCurrentItem();
  },
  methods: {
    syncToCurrentItem() {
      let newCurrentItem = { ...this.currentItem };
      newCurrentItem[this.header.value] =
        this.select == this.items[0] ? true : false;
      this.$store.dispatch(actionTypes.setCurrentItem, newCurrentItem);
    },
    syncFromCurrentItem() {
      this.select = this.currentItem[this.header.value]
        ? this.items[0]
        : this.items[1];
    },
  },
  computed: {
    currentItem() {
      return this.$store.state.app.currentItem;
    },
  },
  watch: {
    currentItem() {
      this.syncFromCurrentItem();
    },
    select(newValue, oldValue) {
      if (!oldValue) {
        return;
      }
      if (oldValue == newValue) {
        return;
      }
      this.syncToCurrentItem();
    },
  },
};
</script>