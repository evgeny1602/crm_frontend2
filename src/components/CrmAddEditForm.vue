<template>
  <v-row justify="center">
    <v-dialog v-model="isVisible" persistent max-width="75%">
      <v-card>
        <v-card-title class="text-h5">{{ getFormTitle }} </v-card-title>
        <v-card-text>
          <div v-for="header in headers" :key="header.value">
            <crm-form-item :field="header.value" />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="saveItem"> Сохранить </v-btn>
          <v-btn class="error" @click="cancelAction"> Отмена </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { actionTypes } from "@/store/modules/app";
import CrmFormItem from "@/components/CrmFormItem";

export default {
  name: "CrmAddEditForm",
  components: { CrmFormItem },
  props: {
    isAdd: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    saveItem() {
      this.$store.dispatch(actionTypes.hideAddEditForm);
      this.$emit("saveItem");
    },
    cancelAction() {
      this.$store.dispatch(actionTypes.clearCurrentItem);
      this.$store.dispatch(actionTypes.hideAddEditForm);
    },
  },
  computed: {
    apiUrl() {
      return "/" + this.$store.state.app.itemsMany;
    },
    itemsMany() {
      return this.$store.state.app.itemsMany;
    },
    currentItem() {
      return this.$store.state.app.currentItem;
    },
    headers() {
      return this.$store.state.app.headers;
    },
    itemTitle2() {
      return this.$store.state.app.itemTitle2;
    },
    isVisible() {
      return this.$store.state.app.isAddEditFormVisible;
    },
    getFormTitle() {
      let title = this.isAdd ? "Добавить" : "Редактировать";
      title = `${title} "${this.itemTitle2}"`;
      return title;
    },
  },
};
</script>
CrmFormItem