import { defineStore } from "pinia";
import { useAxios } from "@/composables/auth/useAxios.js";
import { useSystemStore } from "@/stores/system";
import axios from "axios";

const systemStore = useSystemStore();

export const useMoviesStore = defineStore({
  id: "movies",
  state: () => ({ movie: null, movies: null, loading: false }),
  actions: {
    async uploadMovie(payload) {
      var heads = {
        Authorization: "Bearer " + systemStore.auth["access"],
        "Content-Type": "multipart/form-data"
      };
      const returned = await useAxios("POST", "/api/movies/", payload, heads);
      if (returned.response) {
        this.movie = returned.response.data.results;
        console.log("Em movies.js - uploadMovie - ok");
      }
      if (returned.err) {
        this.users = null;
        console.log("Em movies.js - uploadMovie() - erro");
      }
    },
    getMovies() {
      var heads = {
        "Content-Type": "multipart/form-data"
      };
      return new Promise((result, reject) => {
        this.loading = true;
        axios
          .get("/api/movies/", { "Content-Type": "multipart/form-data" })
          .then(response => {
            this.loading = false;
            this.movies = response.data.results;
            console.log(
              "Em movies.js - useSystemStore - getMovies() - this.movies: ",
              this.movies
            );
            result(
              "Em movies.js - useSystemStore - getMovies() - bem sucedido."
            );
          })
          .catch(err => {
            this.loading = false;
            this.movies = null;
            console.log(
              "Em movies.js - useSystemStore - getMovies() - erro: ",
              err
            );
            reject(err);
          });
      });
    }
  }
});
