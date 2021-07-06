<template>
  <div class="register">
    <v-form>
      <v-container>
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
            <v-text-field label="Пароль" required v-model="password" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Email" required v-model="email" />
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
        .dispatch(actionTypes.register, {
          login: this.login,
          password: this.password,
          email: this.email,
          usergroup: {
            id: 1,
            name: "Адмминистраторы",
          },
        })
        .then(() => {
          this.$router.push({ name: "Dashboard" });
        });
    },
  },
};
</script>
