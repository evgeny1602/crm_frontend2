<template>
  <div class="register">
    <v-card class="pl-8 pr-8 pb-8 pt-8">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <h1>Регистрация в сиситеме</h1>
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
            <v-col cols="12">
              <v-text-field label="Email" required v-model="email" />
            </v-col>
            <v-col cols="12">
              <v-text-field label="Имя" v-model="first_name" />
            </v-col>
            <v-col cols="12">
              <v-text-field label="Отчество" v-model="middle_name" />
            </v-col>
            <v-col cols="12">
              <v-text-field label="Фамилия" v-model="last_name" />
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
    first_name: "",
    middle_name: "",
    last_name: "",
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
          first_name: this.first_name,
          middle_name: this.middle_name,
          last_name: this.last_name,
          usergroup: {
            id: 1,
            name: "",
          },
        })
        .then(() => {
          this.$router.push({ name: "Dashboard" });
        });
    },
  },
};
</script>

<style>
div.register {
  display: flex;
  justify-content: center;
}
</style>