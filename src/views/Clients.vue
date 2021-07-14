<template>
  <div class="clients">
    <crm-grid />
  </div>
</template>

<script>
import CrmGrid from "@/components/CrmGrid";
import { actionTypes } from "@/store/modules/app";
import { dateTransform } from "@/helpers/transforms";

export default {
  components: { CrmGrid },
  mounted() {
    this.$store.dispatch(actionTypes.setItemSingle, "client");
    this.$store.dispatch(actionTypes.setItemsMany, "clients");
    this.$store.dispatch(actionTypes.setCustomLinks, [
      {
        text: "Адреса",
        componentName: "Clientaddresses",
        fk_field: "client_id",
        fk_val: (item) => item.id,
      },
    ]);
    this.$store.dispatch(actionTypes.setHeaders, [
      { text: "Email", value: "email" },
      { text: "Имя", value: "first_name" },
      { text: "Отчество", value: "middle_name" },
      { text: "Фамилия", value: "last_name" },
      { text: "Телефон", value: "phone" },
      {
        text: "Дата рождения",
        is_date: true,
        value: "birthday",
        transform: dateTransform,
      },
      {
        text: "Группа",
        value: "clientgroup",
        f_table: "clientgroups",
        titleFields: ["name"],
        transform: (item) => (item.clientgroup ? item.clientgroup.name : ""),
      },
    ]);
    this.$store.dispatch(actionTypes.setOrderFields, [
      "email",
      "first_name",
      "middle_name",
      "last_name",
      "phone",
    ]);
    this.$store.dispatch(actionTypes.setFilterFields, [
      "email",
      "first_name",
      "middle_name",
      "last_name",
      "phone",
    ]);
    this.$store.dispatch(actionTypes.setItemTitle, "Клиент");
    this.$store.dispatch(actionTypes.setItemTitle2, "Клиента");
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
