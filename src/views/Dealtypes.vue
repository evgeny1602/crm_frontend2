<template>
  <div class="dealtypes">
    <crm-grid />
  </div>
</template>

<script>
import CrmGrid from "@/components/CrmGrid";
import { actionTypes } from "@/store/modules/app";

export default {
  components: { CrmGrid },
  mounted() {
    this.$store.dispatch(actionTypes.setItemSingle, "dealtype");
    this.$store.dispatch(actionTypes.setItemsMany, "dealtypes");
    this.$store.dispatch(actionTypes.setCustomLinks, [
      {
        text: "Сделки",
        componentName: "Deals",
        fk_field: "dealtype_id",
        fk_val: (item) => item.id,
      },
    ]);
    this.$store.dispatch(actionTypes.setHeaders, [
      { text: "Название", value: "name" },
    ]);
    this.$store.dispatch(actionTypes.setOrderFields, ["name"]);
    this.$store.dispatch(actionTypes.setFilterFields, ["name"]);
    this.$store.dispatch(actionTypes.setItemTitle, "Тип сделки");
    this.$store.dispatch(actionTypes.setItemTitle2, "Тип сделки");
    this.$store.dispatch(actionTypes.initFilter);
    if (this.$router.currentRoute.params.field) {
      let filter = {};
      filter[this.$router.currentRoute.params.field] =
        this.$router.currentRoute.params.val;
      this.$store.dispatch(actionTypes.setFilter, filter);
      this.$store.dispatch(actionTypes.setFilterStatus, true);
    }
  },
};
</script>
