<template>
  <div class="events">
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
    this.$store.dispatch(actionTypes.setItemSingle, "event");
    this.$store.dispatch(actionTypes.setItemsMany, "events");
    this.$store.dispatch(actionTypes.setHeaders, [
      { text: "Описание", value: "description" },
      {
        text: "Начало",
        value: "start_datetime",
        is_date: true,
        transform: (item) => dateTransform(item.start_datetime),
      },
      {
        text: "Обработано",
        value: "process_datetime",
        is_date: true,
        transform: (item) => dateTransform(item.process_datetime),
      },
      {
        text: "Тип события",
        value: "eventtype",
        f_table: "eventtypes",
        titleFields: ["name"],
        transform: (item) => item.eventtype.name,
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
        text: "Задача",
        value: "task",
        f_table: "tasks",
        titleFields: ["description"],
        transform: (item) => (item.task ? item.task.description : ""),
      },
      {
        text: "Сделка",
        value: "deal",
        f_table: "deals",
        titleFields: ["description"],
        transform: (item) => (item.deal ? item.deal.description : ""),
      },
      {
        text: "Пользователь",
        value: "user",
        f_table: "users",
        titleFields: ["last_name", "first_name", "middle_name"],
        transform: (item) =>
          item.user
            ? `${item.user.last_name} ${item.user.first_name} ${item.user.middle_name}`
            : "",
      },
      {
        text: "Обработчик",
        value: "processUser",
        f_table: "users",
        titleFields: ["last_name", "first_name", "middle_name"],
        transform: (item) =>
          item.processUser
            ? `${item.processUser.last_name} ${item.processUser.first_name} ${item.processUser.middle_name}`
            : "",
      },
    ]);
    this.$store.dispatch(actionTypes.setOrderFields, ["description"]);
    this.$store.dispatch(actionTypes.setFilterFields, ["description"]);
    this.$store.dispatch(actionTypes.setItemTitle, "Событие");
    this.$store.dispatch(actionTypes.setItemTitle2, "Событие");
  },
};
</script>
