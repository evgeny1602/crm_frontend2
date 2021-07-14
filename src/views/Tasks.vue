<template>
  <div class="tasks">
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
    this.$store.dispatch(actionTypes.setItemSingle, "task");
    this.$store.dispatch(actionTypes.setItemsMany, "tasks");
    this.$store.dispatch(actionTypes.setCustomLinks, []);
    this.$store.dispatch(actionTypes.setHeaders, [
      { text: "Описание", value: "description" },
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
        text: "Тип задачи",
        value: "tasktype",
        f_table: "tasktypes",
        titleFields: ["name"],
        transform: (item) => (item.tasktype ? item.tasktype.name : ""),
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
        text: "Сделка",
        value: "deal",
        f_table: "deals",
        titleFields: ["description"],
        transform: (item) => (item.deal ? item.deal.description : ""),
      },
      {
        text: "Контролер",
        value: "masterUser",
        f_table: "users",
        titleFields: ["last_name", "first_name", "middle_name"],
        transform: (item) =>
          item.masterUser
            ? `${item.masterUser.last_name} ${item.masterUser.first_name} ${item.masterUser.middle_name}`
            : "",
      },
      {
        text: "Создатель",
        value: "createUser",
        f_table: "users",
        titleFields: ["last_name", "first_name", "middle_name"],
        transform: (item) =>
          item.createUser
            ? `${item.createUser.last_name} ${item.createUser.first_name} ${item.createUser.middle_name}`
            : "",
      },
    ]);
    this.$store.dispatch(actionTypes.setOrderFields, ["description"]);
    this.$store.dispatch(actionTypes.setFilterFields, ["description"]);
    this.$store.dispatch(actionTypes.setItemTitle, "Задача");
    this.$store.dispatch(actionTypes.setItemTitle2, "Задачу");
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
