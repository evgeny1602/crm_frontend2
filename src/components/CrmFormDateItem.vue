<template>
  <v-menu
    v-model="isVisible"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
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
      />
    </template>
    <div class="dropdown-date-time-wrapper background_light">
      <div class="dropdown-date-time">
        <v-date-picker v-model="date" no-title />
        <v-time-picker v-model="time" format="24hr" />
      </div>
      <div class="btns-container">
        <v-btn class="ml-4 mb-4 primary" @click="save">OK</v-btn>
        <v-btn class="ml-4 mb-4 error" @click="cancel">Отмена</v-btn>
      </div>
    </div>
  </v-menu>
</template>

<script>
import { actionTypes } from "@/store/modules/app";
// import { dateTransformYearFirst } from "@/helpers/transforms";

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
      time: null,
      date: null,
      dateOld: null,
      timeOld: null,
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
      return this.formatDate();
    },
  },
  methods: {
    save() {
      this.isVisible = false;
    },
    cancel() {
      this.date = this.dateOld;
      this.time = this.timeOld;
      this.isVisible = false;
    },
    syncFromCurrentItem() {
      // this.date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      // .toISOString()
      // .substr(0, 10);
      // this.time = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      // .toISOString()
      // .split("T")[1]
      // .substr(0, 5);
      this.date = null;
      this.time = null;
      if (this.currentItem[this.header.value]) {
        // const d = dateTransformYearFirst(this.currentItem[this.header.value]);
        // console.log(d.split(" "));
        // this.date = d.split(" ")[0];
        // this.time = d.split(" ")[1];
        // [this.date, this.time] = d.split(" ");
        this.date = this.currentItem[this.header.value].substr(0, 10);
        this.time = this.currentItem[this.header.value]
          .split("T")[1]
          .substr(0, 5);
      }
    },
    syncToCurrentItem() {
      let newCurrentItem = { ...this.currentItem };
      newCurrentItem[this.header.value] = `${this.date}T${this.time}:00.000Z`;
      this.$store.dispatch(actionTypes.setCurrentItem, newCurrentItem);
    },
    formatDate() {
      if (!this.date) return null;
      const [year, month, day] = this.date.split("-");
      const [hours, minutes] = this.time.split(":");
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    },
  },
  watch: {
    isVisible() {
      if (this.isVisible) {
        this.dateOld = this.currentItem[this.header.value].substr(0, 10);
        this.timeOld = this.currentItem[this.header.value]
          .split("T")[1]
          .substr(0, 5);
      } else {
        this.dateOld = null;
        this.timeOld = null;
      }
    },
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
    time(newVal, oldVal) {
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

<style>
.dropdown-date-time {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.dropdown-date-time-wrapper {
  display: flex;
  flex-direction: column;
}
.btns-container {
  display: flex;
  justify-content: flex-start !important;
}
</style>