<template>
  <v-row justify="center">
    <v-dialog v-model="isVisible" persistent width="75%">
      <v-card>
        <v-card-title class="text-h5 pa-6 mb-6"
          >{{ getFormTitle }}
        </v-card-title>
        <v-card-text>
          <div class="custom-links-container mb-5">
            <v-btn
              v-for="link in customLinks"
              :key="link.text"
              @click="linkClicked(link)"
              >{{ link.text }}</v-btn
            >
          </div>
          <div class="form-items-container">
            <div
              class="form-item-wrapper"
              v-for="header in headers"
              :key="header.value"
            >
              <crm-form-item :header="header" />
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-btn class="primary mr-1" @click="saveItem"> Сохранить </v-btn>
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
    linkClicked(link) {
      this.$store.dispatch(actionTypes.hideAddEditForm);
      this.$router.push({
        name: link.componentName,
        params: {
          field: link.fk_field,
          val: link.fk_val(this.currentItem),
        },
      });
    },
    saveItem() {
      this.$store.dispatch(actionTypes.hideAddEditForm);
      this.$emit("saveItem");
    },
    cancelAction() {
      this.$store.dispatch(actionTypes.hideAddEditForm);
      this.$store.dispatch(actionTypes.clearCurrentItem);
    },
  },
  computed: {
    customLinks() {
      return this.$store.state.app.customLinks;
    },
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
<style>
.form-items-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}
.form-item-wrapper {
  min-width: 300px;
  width: 48%;
}
@media (max-width: 880px) {
  .form-item-wrapper {
    width: 100%;
  }
}
</style>