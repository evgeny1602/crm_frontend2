<template>
  <v-autocomplete
    v-model="value"
    :items="displayItems"
    :label="header.text"
    @update:search-input="update"
  />
</template>

<script>
// import { actionTypes } from "@/store/modules/app";
import crudApi from "@/api/crud";

export default {
  name: "CrmFormAutoItem",
  props: {
    header: {
      type: Object,
      required: true,
    },
    initVal: {
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
      return this.items.map((item) => {
        let result = {};
        result[this.header.value] = item;
        return this.header.transform(result);
      });
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
      if (this.initVal) {
        let obj = {};
        obj[this.header.value] = this.initVal;
        this.value = this.header.transform(obj);
      }
    },
    syncToCurrentItem() {
      for (const item of this.items) {
        let itemToTransform = {};
        itemToTransform[this.header.value] = item;
        if (this.header.transform(itemToTransform) == this.value) {
          this.$emit("itemChanged", { header: this.header, itemVal: item });
          break;
        }
      }
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
    initVal(newVal, oldVal) {
      if (oldVal == newVal) {
        return;
      }
      this.syncFromCurrent();
    },
    value(newVal, oldVal) {
      if (oldVal == newVal) {
        return;
      }
      this.syncToCurrentItem();
    },
  },
};
</script>