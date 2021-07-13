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
// import { actionTypes } from "@/store/modules/app";
// import { dateTransformYearFirst } from "@/helpers/transforms";

export default {
  name: "CrmFormDateItem",
  props: {
    header: {
      type: Object,
      required: true,
    },
    initVal: {
      type: String,
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
      this.date = null;
      this.time = null;
      if (this.initVal) {
        this.date = this.initVal.substr(0, 10);
        this.time = this.initVal.split("T")[1].substr(0, 5);
      }
    },
    syncToCurrentItem() {
      if (!this.date) {
        return;
      }
      if (this.time == null) {
        this.time = "00:00";
      }
      this.$emit("itemChanged", {
        header: this.header,
        itemVal: `${this.date}T${this.time}:00.000Z`,
      });
    },
    formatDate() {
      if (!this.date) return null;
      const [year, month, day] = this.date.split("-");
      let hours = "00";
      let minutes = "00";
      if (this.time) {
        [hours, minutes] = this.time.split(":");
      }
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    },
  },
  watch: {
    initVal(newVal, oldVal) {
      if (oldVal == newVal) {
        return;
      }
      this.syncFromCurrentItem();
    },
    isVisible() {
      if (this.isVisible) {
        this.dateOld = null;
        if (this.initVal) {
          this.dateOld = this.initVal.substr(0, 10);
        }
        this.timeOld = null;
        if (this.initVal) {
          this.timeOld = this.initVal.split("T")[1].substr(0, 5);
        }
      } else {
        this.dateOld = null;
        this.timeOld = null;
      }
    },

    date(newVal, oldVal) {
      if (oldVal == newVal) {
        return;
      }
      this.syncToCurrentItem();
    },
    time(newVal, oldVal) {
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