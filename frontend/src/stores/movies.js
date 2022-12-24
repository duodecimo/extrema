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
    async getMovies() {
      var heads = {
        Authorization: "Bearer " + systemStore.auth["access"],
        "Content-Type": "multipart/form-data"
      };
      const returned = await useAxios("GET", "/api/movies/", null, heads);
      if (returned.response) {
        this.movies = returned.response.data.results;
        console.log(
          "Em movies.js - useSystemStore - getMovies() - this.movies: ",
          this.movies
        );
        return "Sucesso obtendo lista de filmes.";
      }
      if (returned.err) {
        this.movies = null;
        console.log("Em movies.js - useSystemStore - getMovies() - erro ");
        return "Erro obtendo lista de filmes.";
      }
    }
  }
});
