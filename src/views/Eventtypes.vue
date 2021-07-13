<template>
  <div class="eventtypes">
    <crm-grid />
  </div>
</template>

<script>
import CrmGrid from "@/components/CrmGrid";
import { actionTypes } from "@/store/modules/app";

export default {
  components: { CrmGrid },
  mounted() {
    this.$store.dispatch(actionTypes.setItemSingle, "eventtype");
    this.$store.dispatch(actionTypes.setItemsMany, "eventtypes");
    this.$store.dispatch(actionTypes.setHeaders, [
      { text: "Название", value: "name" },
    ]);
    this.$store.dispatch(actionTypes.setOrderFields, ["name"]);
    this.$store.dispatch(actionTypes.setFilterFields, ["name"]);
    this.$store.dispatch(actionTypes.setItemTitle, "Тип события");
    this.$store.dispatch(actionTypes.setItemTitle2, "Тип события");
    this.$store.dispatch(actionTypes.initFilter);
  },
};
</script>
