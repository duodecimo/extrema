import { defineStore } from "pinia";
import { useAxios } from "@/composables/auth/useAxios.js";

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({ users: null }),
  actions: {
    async fetchUsers() {
      const returned = await useAxios("GET", "/api/users/");
      if (returned.response) {
        this.users = returned.response.data.results;
        console.log("Em users.js - fetchUsers - ok");
        return true;
      }
      if (returned.err) {
        this.users = null;
        console.log("Em users.js - fetchUsers - erro");
        return false;
      }
    }
  }
});
