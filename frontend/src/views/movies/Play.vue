// { // "title": "string", // "is_active": true, // "upload": "string", // "user": 0 // }

<script setup>
import { useMoviesStore } from "@/stores/movies";
import { useSystemStore } from "@/stores/system";
import { onMounted, ref, reactive } from "vue";
import { useDisplay } from "vuetify";
import SystemSpinning from "@/components/system/systemSpinning.vue";
import SnackMessenger from "@/components/utils/snackMessenger.vue";
import MoviePlayer from "@/views/movies/components/moviePlayer.vue";

const { mdAndDown } = useDisplay();
const moviesStore = useMoviesStore();
const systemStore = useSystemStore();
const message = ref(null);
const success = ref(false);
const selected_movie = ref(null);

onMounted(() => {
  selected_movie.value = null;
  moviesStore
    .getMovies()
    .then((response) => {
      success.value = true;
      console.log("In Play.vue - onMounted() - response: ", response);
      message.value = response;
    })
    .catch((err) => {
      success.value = false;
      console.log("In Play.vue - onMounted() - erro: ", err);
      message.value = err;
    });
});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <SystemSpinning />
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row justify="center">
      <div v-if="message">
        <SnackMessenger
          :message="message"
          :timeout="5000"
          @dismissed.once="message = null"
        />
      </div>
    </v-row>
    <div v-if="success && selected_movie">
      <span>selected movie: {{ selected_movie }}</span>
      <v-row no-gutters justify="center" align="center">
        <v-col>
          <movie-player :movieUrl="selected_movie" @end="selected_movie = null" />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-card class="mx-auto">
        <v-card-title
          ><span
            class="ml-10 mt-10 text-h4 text-lg-h3 text-decoration-underline text-break"
            >Clique em um filme para assistir</span
          ></v-card-title
        >
        <v-card-subtitle></v-card-subtitle>
        <v-card-text class="text-left">
          <v-row no-gutters justify="center" align="center">
            <v-col>
              <v-list lines="one">
                <v-list-item
                  v-for="movie in moviesStore.movies"
                  :key="movie.id"
                  :title="movie.title"
                  @click-once="selected_movie = movie.upload"
                ></v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
//
<!-- :on-click-once="(selected_movie = movie.upload)" -->
