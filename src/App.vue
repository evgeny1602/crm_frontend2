<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app class="primary" dark>
      <v-img
        class="mt-4 mb-10 ml-4 mr-4"
        height="auto"
        src="@/assets/logo.png"
      />
      <v-list dense nav>
        <div v-for="item in menu_items" :key="item.text">
          <v-list-group
            color="white"
            v-if="item.subLinks"
            :value="false"
            :prepend-icon="item.icon"
          >
            <template v-slot:activator>
              <v-list-item-title class="text-uppercase font-weight-black">
                {{ item.text }}
              </v-list-item-title>
            </template>
            <v-list-item
              v-for="sub_item in item.subLinks"
              :key="sub_item.text"
              :to="sub_item.to"
            >
              <v-list-item-icon>
                <v-icon right />
              </v-list-item-icon>
              <v-list-item-title>
                {{ sub_item.text }}
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :to="item.to">
            <v-list-item-icon>
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-uppercase font-weight-black">
              {{ item.text }}
            </v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app class="background" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="text-uppercase">
        {{ $router.currentRoute.meta.title }}
      </v-toolbar-title>
      <v-spacer />
      <v-chip>
        <v-icon> mdi-account </v-icon>
        <b>
          {{ getCurrentUserLogin }}
        </b>
      </v-chip>
      <v-switch
        class="mt-6 ml-10"
        :prepend-icon="
          $vuetify.theme.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'
        "
        @change="$vuetify.theme.dark = !$vuetify.theme.dark"
      />
    </v-app-bar>
    <v-main class="background">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import {mapGetters} from 'vuex'
import main_menu_items from "./config/main_menu.js";
import { actionTypes } from "@/store/modules/auth";

export default {
  data: () => ({
    drawer: null,
    menu_items: main_menu_items,
  }),
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  },
  computed: {
    getCurrentUserLogin() {
      return this.$store.state.auth.currentUser
        ? this.$store.state.auth.currentUser.login
        : "";
    },
  },
};
</script>
