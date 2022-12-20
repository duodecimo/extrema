<script setup>
// const items = [
//   { title: "Home", icon: "mdi-view-dashboard", to: "/" },
//   { title: "About", icon: "mdi-forum", to: "/" },
//   { title: "Voices", icon: "mdi-bullhorn", to: "/voices" },
//   { title: "Login", icon: "mdi-login", to: "/login" },
//   { title: "Usuários", icon: "mdi-account-multiple", to: "/users" },
//   { title: "Upload", icon: "mdi-file-upload", to: "/upload" },
// ];
const items = [
  { title: "Home", icon: "mdi-view-dashboard", to: "/" },
  { title: "About", icon: "mdi-forum", to: "/" },
  { title: "Login", icon: "mdi-login", to: "/login" },
  { title: "Voices", icon: "mdi-bullhorn", to: "/voices" },
];

const getImageUrl = (name) => {
  return new URL(name, import.meta.url).href;
};
</script>

<template>
  <div>
    <!-- this is: src/components/app/navigationList.vue -->
    <v-list-item :prepend-avatar="getImageUrl('../../assets/3minds.jpg')">
      <v-list-item-title>Extrema</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      <!-- <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to ? item.to : null"
        link
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item> -->
    </v-list>
  </div>
</template>
// this.$router.push({ path: item.route })
