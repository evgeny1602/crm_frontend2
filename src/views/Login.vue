<template>
  <div class="login">
    <v-card class="pl-8 pr-8 pb-8 pt-8">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <h1>Вход в систему</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <crm-validation-errors
                v-if="validationErrors"
                :errors="validationErrors"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Логин" required v-model="login" />
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="password"
                label="Пароль"
                required
                v-model="password"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn color="primary" @click="submit" :disabled="isSubmitting">
                Отправить
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import CrmValidationErrors from "@/components/CrmValidationErrors";
import { actionTypes } from "@/store/modules/auth";

export default {
  components: {
    CrmValidationErrors,
  },
  data: () => ({
    login: "",
    email: "",
    password: "",
  }),
  computed: {
    validationErrors() {
      return this.$store.state.auth.validationErrors;
    },
    isSubmitting() {
      return this.$store.state.auth.isSubmitting;
    },
  },
  methods: {
    submit() {
      this.$store
        .dispatch(actionTypes.login, {
          login: this.login,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "Dashboard" });
        });
    },
  },
};
</script>

<style>
div.login {
  display: flex;
  justify-content: center;
}
</style>
