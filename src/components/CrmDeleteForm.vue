<template>
  <v-row justify="center">
    <v-dialog v-model="isVisible" persistent max-width="40%">
      <v-card>
        <v-card-title class="text-h5">Удаление записей</v-card-title>
        <v-card-text>
          Вы уверены, что хотите удалить выбранные записи?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="deleteItems"> Удалить </v-btn>
          <v-btn class="error" @click="cancelAction"> Отмена </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { actionTypes } from "@/store/modules/app";

export default {
  name: "CrmDeleteForm",
  methods: {
    deleteItems() {
      this.$store.dispatch(actionTypes.hideDeleteForm);
      this.$emit("deleteItems");
    },
    cancelAction() {
      this.$store.dispatch(actionTypes.hideDeleteForm);
    },
  },
  computed: {
    isVisible() {
      return this.$store.state.app.isDeleteFormVisible;
    },
  },
};
</script>