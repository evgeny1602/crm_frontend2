<template>
  <div class="tasktypes">
    <crm-grid />
  </div>
</template>

<script>
import CrmGrid from "@/components/CrmGrid";
import { actionTypes } from "@/store/modules/app";

export default {
  components: { CrmGrid },
  mounted() {
    this.$store.dispatch(actionTypes.setItemSingle, "tasktype");
    this.$store.dispatch(actionTypes.setItemsMany, "tasktypes");
    this.$store.dispatch(actionTypes.setCustomLinks, [
      {
        text: "Задачи",
        componentName: "Tasks",
        fk_field: "tasktype_id",
        fk_val: (item) => item.id,
      },
    ]);
    this.$store.dispatch(actionTypes.setHeaders, [
      { text: "Название", value: "name" },
    ]);
    this.$store.dispatch(actionTypes.setOrderFields, ["name"]);
    this.$store.dispatch(actionTypes.setFilterFields, ["name"]);
    this.$store.dispatch(actionTypes.setItemTitle, "Тип задачи");
    this.$store.dispatch(actionTypes.setItemTitle2, "Тип задачи");
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
