<template>
  <div class="register">
    <v-form>
      <v-container>
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
export default {
  data: () => ({
    login: "",
    email: "",
    password: "",
  }),
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting
    }
  },
  methods: {
      submit(){
        this.$store.dispatch('register')
      }
  }
};
</script>
