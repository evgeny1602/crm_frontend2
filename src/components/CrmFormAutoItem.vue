<template>
  <v-autocomplete
    v-model="value"
    :items="displayItems"
    outlined
    :label="header.text"
    @update:search-input="update"
  />
</template>

<script>
import { actionTypes } from "@/store/modules/app";
import crudApi from "@/api/crud";

export default {
  name: "CrmFormAutoItem",
  props: {
    header: {
      type: Object,
      required: true,
    },
  },
  async mounted() {
    this.syncFromCurrent();
    await this.fetchItems();
  },
  computed: {
    displayItems() {
      // let resultItems = []
      // for(const item of this.items) {
      //   let resultItem = {}
      //   resultItem[this.header.value] = this.header.transform(item);
      //   resultItems.push(resultItem)
      // }
      // return resultItems

      return this.items.map((item) => {
        let result = {};
        result[this.header.value] = item;
        return this.header.transform(result);
      });
    },
    currentItem() {
      return this.$store.state.app.currentItem;
    },
  },
  data() {
    return {
      value: null,
      items: [],
    };
  },
  methods: {
    async fetchItems(titleFieldValue = null) {
      let filter = {};
      let searchStr = null;
      if (this.value) {
        searchStr = this.value;
      }
      if (titleFieldValue) {
        searchStr = titleFieldValue;
      }
      if (searchStr) {
        searchStr = searchStr.split(" ");
      } else {
        searchStr = [];
      }

      for (const k in this.header.titleFields) {
        if (searchStr[k]) {
          filter[this.header.titleFields[k]] = searchStr[k];
        }
      }
      const params = {
        limit: 5,
        offset: 0,
        ...filter,
      };
      const response = await crudApi.readAll("/" + this.header.f_table, params);
      this.items = response.data[this.header.f_table];
    },
    syncFromCurrent() {
      this.value = null;
      if (this.currentItem[this.header.value]) {
        this.value = this.header.transform(this.currentItem);
      }
    },
    syncToCurrentItem() {
      let newCurrentItem = { ...this.currentItem };
      for (const item of this.items) {
        if (this.header.transform(item) == this.value) {
          newCurrentItem[this.header.value] = item;
          break;
        }
      }
      this.$store.dispatch(actionTypes.setCurrentItem, newCurrentItem);
    },
    async update(s) {
      if (!s) {
        return;
      }
      if (s.length > 2) {
        await this.fetchItems(s);
      }
    },
  },
  watch: {
    currentItem() {
      this.syncFromCurrent();
    },
    value(newVal, oldVal) {
      // if (oldVal === null) {
      //   return;
      // }
      if (oldVal == newVal) {
        return;
      }
      this.syncToCurrentItem();
    },
  },
};
</script>