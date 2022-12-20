<script setup>
import { RouterView } from "vue-router";
import AppBar from "@/components/app/appBar.vue";
import NavigationList from "@/components/app/navigationList.vue";
import { ref } from "vue";

const drawer = ref(true);
// const items = [
//   { title: "Home", icon: "mdi-view-dashboard" },
//   { title: "About", icon: "mdi-forum" },
// ];
</script>

<template>
  <v-app>
    <!-- colors: primary, secondary, accent, error, info, success, warning -->
    <AppBar @drawer="drawer = !drawer" />
    <v-navigation-drawer
      v-model="drawer"
      app
      absolute
      temporary
      dark
      overlay-opacity="0.8"
      mobile-breakpoint="960"
      bottom
    >
      <NavigationList />
    </v-navigation-drawer>
    <v-main>
      <RouterView />
    </v-main>
    <v-footer app bottom fixed padless color="primary" dark
      ><v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>3MINDS TEAM</strong>
      </v-col></v-footer
    >
  </v-app>
  <!-- <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <p></p>
  <RouterView /> -->
</template>

<style scoped></style>
