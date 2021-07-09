<template>
  <div class="clientaddresses">
    <crm-grid />
  </div>
</template>

<script>
import CrmGrid from "@/components/CrmGrid";
import { actionTypes } from "@/store/modules/app";

export default {
  components: { CrmGrid },
  mounted() {
    this.$store.dispatch(actionTypes.setItemSingle, "clientaddress");
    this.$store.dispatch(actionTypes.setItemsMany, "clientaddresses");
    this.$store.dispatch(actionTypes.setHeaders, [
      { text: "Адрес", value: "address" },
      { text: "Город", value: "city" },
      { text: "Индекс", value: "index" },
      { text: "Страна", value: "country" },
      { text: "Регион", value: "region" },
      {
        text: "Основной адрес",
        value: "is_default",
        is_bool: true,
        transform: (is_default) => (is_default ? "Да" : "Нет"),
      },
      {
        text: "Клиент",
        value: "client",
        f_table: "clients",
        titleFields: ["last_name", "first_name", "middle_name"],
        transform: (item) =>
          item.client
            ? `${item.client.last_name} ${item.client.first_name} ${item.client.middle_name}`
            : "",
      },
    ]);
    this.$store.dispatch(actionTypes.setOrderFields, [
      "address",
      "city",
      "country",
      "region",
    ]);
    this.$store.dispatch(actionTypes.setFilterFields, [
      "address",
      "city",
      "country",
      "region",
    ]);
    this.$store.dispatch(actionTypes.setItemTitle, "Адрес клиента");
    this.$store.dispatch(actionTypes.setItemTitle2, "Адрес клиента");
  },
};
</script>
