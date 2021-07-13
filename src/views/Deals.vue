<template>
  <div class="deals">
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
    this.$store.dispatch(actionTypes.setItemSingle, "deal");
    this.$store.dispatch(actionTypes.setItemsMany, "deals");
    this.$store.dispatch(actionTypes.setHeaders, [
      { text: "Описание", value: "description" },
      { text: "Сумма", value: "amount" },
      {
        text: "Начало",
        value: "start_datetime",
        is_date: true,
        transform: (item) => dateTransform(item.start_datetime),
      },
      {
        text: "План. окончание",
        value: "end_datetime",
        is_date: true,
        transform: (item) => dateTransform(item.end_datetime),
      },
      {
        text: "Факт. окончание",
        value: "done_datetime",
        is_date: true,
        transform: (item) => dateTransform(item.done_datetime),
      },
      {
        text: "Тип сделки",
        value: "dealtype",
        f_table: "dealtypes",
        titleFields: ["name"],
        transform: (item) => (item.dealtype ? item.dealtype.name : ""),
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
      {
        text: "Ответственный",
        value: "workerUser",
        f_table: "users",
        titleFields: ["last_name", "first_name", "middle_name"],
        transform: (item) =>
          item.workerUser
            ? `${item.workerUser.last_name} ${item.workerUser.first_name} ${item.workerUser.middle_name}`
            : "",
      },
      {
        text: "Закрывший",
        value: "doneUser",
        f_table: "users",
        titleFields: ["last_name", "first_name", "middle_name"],
        transform: (item) =>
          item.doneUser
            ? `${item.doneUser.last_name} ${item.doneUser.first_name} ${item.doneUser.middle_name}`
            : "",
      },
    ]);
    this.$store.dispatch(actionTypes.setOrderFields, ["description"]);
    this.$store.dispatch(actionTypes.setFilterFields, ["description"]);
    this.$store.dispatch(actionTypes.setItemTitle, "Сделка");
    this.$store.dispatch(actionTypes.setItemTitle2, "Сделку");
    this.$store.dispatch(actionTypes.initFilter);
  },
};
</script>
