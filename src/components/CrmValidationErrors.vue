<template>
  <div>
    <v-alert
      v-for="errorMessage in errorMessages"
      :key="errorMessage"
      border="left"
      dense
      elevation="1"
      type="error"
    >
      {{ errorMessage }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "CrmValidationErrors",
  props: {
    errors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorMessages() {
      return Object.keys(this.errors).map((name) => {
        let messages = this.errors[name].join(", ");
        messages = messages.charAt(0).toUpperCase() + messages.slice(1);
        return messages;
      });
    },
  },
};
</script>