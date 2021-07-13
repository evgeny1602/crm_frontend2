<template>
  <v-card class="mb-2" elevation="1">
    <v-switch
      :prepend-icon="
        filterStatus ? 'mdi-filter-outline' : 'mdi-filter-remove-outline'
      "
      class="pt-3 ml-3"
      @change="switchFilterStatus"
      v-model="status"
    />
    <v-card-text class="filter-fields-container">
      <div
        class="filter-item mr-4"
        v-for="header in filterHeaders"
        :key="header.value"
      >
        <crm-form-date-item
          v-if="header.is_date"
          :header="header"
          :initVal="filter[header.value]"
          @itemChanged="itemChanged"
        />
        <crm-form-auto-item
          v-else-if="header.f_table"
          :header="header"
          :initVal="
            (filter[header.value] || '') == '' ? {} : filter[header.value]
          "
          @itemChanged="itemChanged"
        />
        <crm-form-bool-item
          v-else-if="header.is_bool"
          :header="header"
          :initVal="sToB(filter[header.value])"
          @itemChanged="itemChanged"
        />
        <crm-form-text-item
          v-else
          :header="header"
          :initVal="filter[header.value] || ''"
          @itemChanged="itemChanged"
        />
      </div>
    </v-card-text>
    <div class="filter-btns-wrapper pa-4">
      <v-btn outlined color="error" @click="resetFilter"> Сбросить </v-btn>
    </div>
  </v-card>
</template>

<script>
import CrmFormTextItem from "@/components/CrmFormTextItem";
import CrmFormDateItem from "@/components/CrmFormDateItem";
import CrmFormAutoItem from "@/components/CrmFormAutoItem";
import CrmFormBoolItem from "@/components/CrmFormBoolItem";
import { strToBool } from "@/helpers/transforms";
import { actionTypes } from "@/store/modules/app";

export default {
  name: "CrmFilterForm",
  components: {
    CrmFormTextItem,
    CrmFormDateItem,
    CrmFormAutoItem,
    CrmFormBoolItem,
  },
  data() {
    return {
      status: false,
    };
  },
  methods: {
    transformFilter(val) {
      if (val === true) {
        return 1;
      }
      if (val === false) {
        return 0;
      }
      return val;
    },
    sToB(s) {
      return strToBool(s);
    },
    itemChanged({ header, itemVal }) {
      let newFilter = { ...this.filter };
      newFilter[header.value] = this.transformFilter(itemVal);
      newFilter.like = 1;
      this.$store.dispatch(actionTypes.setFilter, newFilter);
      this.$emit("filterChanged");
    },
    switchFilterStatus() {
      const newFilterStatus = !this.filterStatus;
      this.$store.dispatch(actionTypes.setFilterStatus, newFilterStatus);
      this.$emit("filterChanged");
    },
    resetFilter() {
      this.$store.dispatch(actionTypes.setFilter, {});
      this.$store.dispatch(actionTypes.setFilterStatus, false);
      this.$emit("filterChanged");
    },
  },
  watch: {
    filterStatus() {
      this.status = this.filterStatus;
    },
  },
  computed: {
    filterStatus() {
      return this.$store.state.app.filterStatus;
    },
    filter() {
      return this.$store.state.app.filter;
    },
    filterHeaders() {
      const resultHeaders = this.$store.state.app.headers
        .filter((h) => {
          return !("is_hidden" in h);
        })
        .map((h) => {
          return {
            ...h,
            sortable: this.$store.state.app.filterFields.includes(h.value),
          };
        });
      return resultHeaders;
    },
  },
};
</script>

<style>
.filter-btns-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.filter-fields-container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.filter-item {
  min-width: 200px;
}
</style>