<script setup>
import { onMounted, ref, reactive } from "vue";
import { useSystemStore } from "@/stores/system";
import { useMoviesStore } from "@/stores/movies";
import SystemSpinning from "@/components/system/systemSpinning.vue";
import SnackMessenger from "@/components/utils/snackMessenger.vue";

const props = defineProps({
  selectedMovieURL: {
    type: URL,
    required: true,
  },
  selectedMovieID: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["end"]);
const moviesStore = useMoviesStore();
const systemStore = useSystemStore();

const isPlaying = ref(false);
const videoPlayer = ref(null);
const message = ref(null);
const success = ref(false);

function play() {
  videoPlayer.value.play();
  isPlaying.value = true;
}

function pause() {
  videoPlayer.value.pause();
  isPlaying.value = false;
}

function foward() {
  videoPlayer.value.foward();
}

function rewind() {
  videoPlayer.value.rewind();
}

onMounted(async () => {
  console.log("In moviePlayer - onMounted()");
  console.log(
    "In moviePlayer - onMounted() - props - selectedMovieID: ",
    props.selectedMovieID
  );
  console.log(
    "In moviePlayer - onMounted() - props - selectedMovieURL: ",
    props.selectedMovieURL
  );
  console.log(
    "In moviePlayer - onMounted() - props - user id: ",
    systemStore.auth.userid
  );
  var result = await moviesStore
    .postMovieSession({
      movie: props.selectedMovieID,
      user: systemStore.auth.userid,
    })
    .then((response) => {
      success.value = true;
      console.log("In moviePlayer.vue - onMounted() - response: ", response);
      message.value = response;
    })
    .catch((err) => {
      success.value = false;
      console.log("In moviePlayer.vue - onMounted() - erro: ", err);
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
          :timeout="3000"
          @dismissed.once="message = null"
        />
      </div>
    </v-row>
    <v-row justify="center">
      <video controls width="500" ref="videoPlayer">
        <source :src="selectedMovieURL" />
        Sorry, your browser doesn't support embedded videos.
      </video></v-row
    >
    <p />
    <v-row justify="center" align="center">
      <!-- <v-col cols="2">
        <v-btn color="primary" @click.stop="play()">play</v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn color="primary" @click.stop="pause()">pause</v-btn>
      </v-col>
      <v-col cols="2">
        <v-slider readonly="" v-model="videoPlayer.currentTime"></v-slider>
      </v-col>
      <v-col cols="2">
        <v-btn color="primary" @click.stop="foward()">foward</v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn color="primary" @click.stop="rewind()">rewind</v-btn>
      </v-col> -->
      <v-col cols="2">
        <v-btn color="primary" @click.stop="emit('end')">Fim</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
