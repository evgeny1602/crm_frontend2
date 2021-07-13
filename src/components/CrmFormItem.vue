<template>
  <crm-form-date-item
    v-if="header.is_date"
    :header="header"
    :initVal="currentItem[header.value]"
    @itemChanged="itemChanged"
  />
  <crm-form-auto-item
    v-else-if="header.f_table"
    :header="header"
    :initVal="currentItem[header.value] == '' ? {} : currentItem[header.value]"
    @itemChanged="itemChanged"
  />
  <crm-form-bool-item
    v-else-if="header.is_bool"
    :header="header"
    :initVal="sToB(currentItem[header.value])"
    @itemChanged="itemChanged"
  />
  <crm-form-text-item
    v-else
    :header="header"
    :initVal="currentItem[header.value] || ''"
    @itemChanged="itemChanged"
  />
</template>

<script>
import CrmFormTextItem from "@/components/CrmFormTextItem";
import CrmFormDateItem from "@/components/CrmFormDateItem";
import CrmFormAutoItem from "@/components/CrmFormAutoItem";
import CrmFormBoolItem from "@/components/CrmFormBoolItem";
import { actionTypes } from "@/store/modules/app";
import { strToBool } from "@/helpers/transforms";

export default {
  name: "CrmFormItem",
  components: {
    CrmFormTextItem,
    CrmFormDateItem,
    CrmFormAutoItem,
    CrmFormBoolItem,
  },
  props: {
    header: {
      type: Object,
      required: true,
    },
  },
  methods: {
    sToB(s) {
      return strToBool(s);
    },
    itemChanged({ header, itemVal }) {
      let newCurrentItem = { ...this.currentItem };
      newCurrentItem[header.value] = itemVal;
      this.$store.dispatch(actionTypes.setCurrentItem, newCurrentItem);
    },
  },
  computed: {
    currentItem() {
      return this.$store.state.app.currentItem;
    },
  },
};
</script>