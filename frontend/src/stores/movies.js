import { defineStore } from "pinia";
import { useAxios } from "@/composables/auth/useAxios.js";
import { useSystemStore } from "@/stores/system";

const systemStore = useSystemStore();

export const useMoviesStore = defineStore({
  id: "movies",
  state: () => ({ movie: null, loading: false }),
  actions: {
    async uploadMovie(payload) {
      var heads = {
        "Authorization": "Bearer " + systemStore.auth["access"],
        "Content-Type": "multipart/form-data"
      }
      const returned = await useAxios("POST", "/api/movies/", payload, heads);
      if (returned.response) {
        this.movie = returned.response.data.results;
        console.log("Em movies.js - uploadMovie - ok");
      }
      if (returned.err) {
        this.users = null;
        console.log("Em movies.js - uploadMovie - erro");
      }
    }
  }
});
