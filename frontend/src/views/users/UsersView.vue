<script setup>
import { useSystemStore } from "@/stores/system";
import { useUsersStore } from "@/stores/users";

const systemStore = useSystemStore();
const payload = {
  email: "admin@gmail.com",
  password: "123456",
};
const usersStore = useUsersStore();
function login() {
  systemStore
    .login(payload)
    .then((response) => {
      console.log("Em SystemLogin - login - resultado: ", response);
    })
    .catch((err) => {
      console.log("Em SystemLogin - login - erro: ", err.message);
    });
  console.log("Em SystemLogin - login - auth: ", systemStore.auth);
}
</script>

<template>
  <div>
    <v-container>
      <span class="text-body-1 text-lg-h6 text-break"
        >payload para teste: {{ payload }}</span
      >
      <v-row justify="center">
        <v-col cols="12">
          <v-btn @click.stop="login">Login</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn @click.stop="usersStore.fetchUsers()">Users</v-btn>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-if="systemStore.auth"
            class="text-body-1 text-lg-h6 text-break"
            filled
            label="auth"
            :value="systemStore.auth"
            readonly
          ></v-textarea
        ></v-col>
      </v-row>
    </v-container>
    <v-list dense nav>
      <v-list-item v-for="user in usersStore.users" :key="user.email">
        <span class="text-body-1 text-lg-h6 text-break"
          >email: {{ user.email }}</span
        ><br />
        <span class="text-body-1 text-lg-h6 text-break"
          >nome: {{ user.name }}</span
        >
      </v-list-item>
    </v-list>
  </div>
</template>
