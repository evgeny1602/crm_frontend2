<template>
  <div class="usergroups">
    <crm-grid />
  </div>
</template>

<script>
import CrmGrid from "@/components/CrmGrid";
import { actionTypes } from "@/store/modules/app";

export default {
  components: { CrmGrid },
  mounted() {
    this.$store.dispatch(actionTypes.setItemSingle, "usergroup");
    this.$store.dispatch(actionTypes.setItemsMany, "usergroups");
    this.$store.dispatch(actionTypes.setHeaders, [
      { text: "Название", value: "name" },
    ]);
    this.$store.dispatch(actionTypes.setOrderFields, ["name"]);
    this.$store.dispatch(actionTypes.setFilterFields, ["name"]);
    this.$store.dispatch(actionTypes.setItemTitle, "Группа пользователей");
    this.$store.dispatch(actionTypes.setItemTitle2, "Группу пользователей");
    this.$store.dispatch(actionTypes.initFilter);
    this.$store.dispatch(actionTypes.initFilter);
  },
};
</script>
