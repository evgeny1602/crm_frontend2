<template>
  <div>
    <div class="btns-container">
      <v-btn @click="showAddForm" class="primary mb-10">
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
      <v-btn
        @click="showDelForm"
        class="error mb-10 ml-2"
        :disabled="selected.length < 1"
      >
        <v-icon dark> mdi-trash-can-outline </v-icon>
      </v-btn>
    </div>
    <crm-delete-form @deleteItems="deleteMany" />
    <crm-add-edit-form :isAdd="isAdd" @saveItem="saveItem" />
    <v-data-table
      show-select
      v-model="selected"
      :items-per-page="limit"
      :headers="tableHeaders"
      :items="tableItems"
      :options.sync="options"
      :server-items-length="itemsCount"
      :loading="isLoading"
      class="elevation-1 data-grid"
      @click:row="rowClicked"
    ></v-data-table>
  </div>
</template >
<script>
import { actionTypes } from "@/store/modules/crud";
import { mutationTypes } from "@/store/modules/app";
import CrmAddEditForm from "@/components/CrmAddEditForm";
import CrmDeleteForm from "@/components/CrmDeleteForm";

export default {
  components: { CrmAddEditForm, CrmDeleteForm },
  name: "CrmGrid",

  data() {
    return {
      isAdd: true,
      selected: [],
      options: {},
      offset: 0,
      limit: 5,
      order: "",
      ordertype: "ASC",
      filter: {},
    };
  },
  watch: {
    options: {
      handler() {
        this.order = this.options.sortBy[0] ? this.options.sortBy[0] : "";
        this.ordertype = this.options.sortDesc[0] ? "DESC" : "ASC";
        this.limit = Number(this.options.itemsPerPage);
        this.offset = (this.options.page - 1) * this.limit;
        this.fetchData();
      },
      deep: true,
    },
  },
  methods: {
    showDelForm() {
      this.$store.commit(mutationTypes.showDeleteForm);
    },
    async deleteMany() {
      const selectedIds = this.selected.map((item) => item.id);
      for (const id of selectedIds) {
        await this.$store.dispatch(
          actionTypes.deleteOne,
          `/${this.itemsMany}/${id}`
        );
      }
      this.$store.commit(mutationTypes.hideDeleteForm);
      this.fetchData();
    },
    rowClicked(itemData) {
      let rawItemData = null;
      for (const item of this.items) {
        if (item.id == itemData.id) {
          rawItemData = item;
          break;
        }
      }
      this.$store.commit(mutationTypes.setCurrentItem, rawItemData);
      this.isAdd = false;
      this.$store.commit(mutationTypes.showAddEditForm);
    },
    showAddForm() {
      this.$store.commit(mutationTypes.clearCurrentItem);
      this.isAdd = true;
      this.$store.commit(mutationTypes.showAddEditForm);
    },
    saveItem() {
      if (!this.currentItem.id) {
        this.$store
          .dispatch(actionTypes.create, {
            apiUrl: "/" + this.itemsMany,
            params: this.currentItem,
          })
          .then(() => {
            this.fetchData();
          });
      }
      if (this.currentItem.id) {
        this.$store
          .dispatch(actionTypes.update, {
            apiUrl: "/" + this.itemsMany + "/" + this.currentItem.id,
            params: this.currentItem,
          })
          .then(() => {
            this.fetchData();
          });
      }
    },
    fetchData() {
      this.$store.dispatch(actionTypes.readAll, {
        apiUrl: "/" + this.itemsMany,
        params: {
          limit: this.limit,
          offset: this.offset,
          order: this.order,
          ordertype: this.ordertype,
          ...this.filter,
        },
      });
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.clearData);
    this.fetchData();
  },
  computed: {
    tableHeaders() {
      const storeHeaders = this.$store.state.app.headers;
      const resultHeaders = storeHeaders.filter((h) => {
        return !("is_hidden" in h);
      });
      return resultHeaders;
    },
    headers() {
      return this.$store.state.app.headers;
    },
    isLoading() {
      return this.$store.state.crud.isLoading;
    },
    error() {
      return this.$store.state.crud.error;
    },
    items() {
      return this.$store.state.crud.data[`${this.itemsMany}`];
    },
    tableItems() {
      if (!this.$store.state.crud.data) {
        return [];
      }
      const storeItems = this.$store.state.crud.data[`${this.itemsMany}`];
      if (!storeItems) {
        return [];
      }
      const storeHeaders = this.$store.state.app.headers;
      let resultItems = [];
      for (const item of storeItems) {
        let resultItem = { ...item };
        for (const k of Object.keys(item)) {
          for (const header of storeHeaders) {
            if (k == header.value) {
              if ("transform" in header) {
                resultItem[k] = header.transform(item);
              }
            }
          }
        }
        resultItems.push(resultItem);
      }
      return resultItems;
    },
    itemsMany() {
      return this.$store.state.app.itemsMany;
    },
    itemsCount() {
      if (this.$store.state.crud.data) {
        return this.$store.state.crud.data[`${this.itemsMany}Count`];
      }
      return 0;
    },
    currentItem() {
      return this.$store.state.app.currentItem;
    },
  },
};
</script>

<style>
.data-grid tbody tr :hover {
  cursor: pointer;
}
.btns-container {
  display: flex;
  justify-content: flex-end;
}
</style>