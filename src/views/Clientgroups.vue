<template>
  <div class="clientgroups">
    <crm-grid />
  </div>
</template>

<script>
import CrmGrid from "@/components/CrmGrid";
import { actionTypes } from "@/store/modules/app";

export default {
  components: { CrmGrid },
  mounted() {
    this.$store.dispatch(actionTypes.setItemSingle, "clientgroup");
    this.$store.dispatch(actionTypes.setItemsMany, "clientgroups");
    this.$store.dispatch(actionTypes.setCustomLinks, [
      {
        text: "Клиенты",
        componentName: "Clients",
        fk_field: "clientgroup_id",
        fk_val: (item) => item.id,
      },
    ]);
    this.$store.dispatch(actionTypes.setHeaders, [
      { text: "Название", value: "name" },
    ]);
    this.$store.dispatch(actionTypes.setOrderFields, ["name"]);
    this.$store.dispatch(actionTypes.setFilterFields, ["name"]);
    this.$store.dispatch(actionTypes.setItemTitle, "Группа клиентов");
    this.$store.dispatch(actionTypes.setItemTitle2, "Группу клиентов");
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
