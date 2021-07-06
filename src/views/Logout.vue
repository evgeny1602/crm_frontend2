<template>
  <div class="logout"></div>
</template>

<script>
import { actionTypes } from "@/store/modules/auth";

export default {
  mounted() {
    this.$store.dispatch(actionTypes.logOut).then(() => {
      this.$router.push({ name: "Login" });
    });
  },
};
</script>