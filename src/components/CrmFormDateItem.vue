<template>
  <v-menu
    v-model="isVisible"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        outlined
        v-model="computedDateFormatted"
        :label="header.text"
        hint="дд.мм.гггг"
        persistent-hint
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      @input="isVisible = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { actionTypes } from "@/store/modules/app";

export default {
  name: "CrmFormDateItem",
  props: {
    header: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isVisible: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
  mounted() {
    this.syncFromCurrentItem();
  },
  computed: {
    currentItem() {
      return this.$store.state.app.currentItem;
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  methods: {
    syncFromCurrentItem() {
      this.date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
      if (this.currentItem[this.header.value]) {
        this.date = this.currentItem[this.header.value].substr(0, 10);
      }
    },
    syncToCurrentItem() {
      let newCurrentItem = { ...this.currentItem };
      newCurrentItem[this.header.value] = this.date;
      this.$store.dispatch(actionTypes.setCurrentItem, newCurrentItem);
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}.${month}.${year}`;
    },
  },
  watch: {
    currentItem() {
      this.syncFromCurrentItem();
    },
    date(newVal, oldVal) {
      if (oldVal === null) {
        return;
      }
      if (oldVal == newVal) {
        return;
      }
      this.syncToCurrentItem();
    },
  },
};
</script>