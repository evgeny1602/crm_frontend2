<template>
  <div class="users">
    <crm-grid />
  </div>
</template>

<script>
import CrmGrid from "@/components/CrmGrid";
import { actionTypes } from "@/store/modules/app";

export default {
  components: { CrmGrid },
  mounted() {
    this.$store.dispatch(actionTypes.setItemSingle, "user");
    this.$store.dispatch(actionTypes.setItemsMany, "users");
    this.$store.dispatch(actionTypes.setHeaders, [
      { text: "Логин", value: "login" },
      { text: "Email", value: "email" },
      { text: "Имя", value: "first_name" },
      { text: "Отчество", value: "middle_name" },
      { text: "Фамилия", value: "last_name" },
      {
        text: "Включен",
        value: "is_active",
        is_bool: true,
        transform: (item) => (item.is_active ? "Да" : "Нет"),
      },
      { text: "Аватар", value: "image", is_hidden: true },
      {
        text: "Группа",
        value: "usergroup",
        f_table: "usergroups",
        titleField: "name",
        transform: (item) => item.usergroup.name,
      },
    ]);
    this.$store.dispatch(actionTypes.setOrderFields, [
      "login",
      "email",
      "first_name",
      "middle_name",
      "last_name",
    ]);
    this.$store.dispatch(actionTypes.setFilterFields, [
      "login",
      "email",
      "first_name",
      "middle_name",
      "last_name",
    ]);
    this.$store.dispatch(actionTypes.setItemTitle, "Пользователь");
    this.$store.dispatch(actionTypes.setItemTitle2, "Пользователя");
  },
};
</script>
