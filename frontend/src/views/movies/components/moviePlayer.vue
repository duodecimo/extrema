<script setup>
import { onMounted, ref, reactive, nextTick } from "vue";
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

const videoPlayer = ref(null);
const isPlaying = ref(false);
const message = ref(null);
const success = ref(false);
const timer = ref(0);

function play() {
  videoPlayer.value.play();
  isPlaying.value = true;
}

function pause() {
  videoPlayer.value.pause();
  isPlaying.value = false;
}

function foward() {
  if (videoPlayer && videoPlayer.value) {
    console.log(
      ">>> Event: foward was clicked. time before: ",
      videoPlayer.value.currentTime
    );
    videoPlayer.value.currentTime = videoPlayer.value.currentTime + 10;
    console.log(
      ">>> Event: foward was clicked. time after: ",
      videoPlayer.value.currentTime
    );
  }
}

function rewind() {
  if (videoPlayer && videoPlayer.value && videoPlayer.value.currentTime > 10) {
    console.log(
      ">>> Event: rewind was clicked. time before: ",
      videoPlayer.value.currentTime
    );
    videoPlayer.value.currentTime = videoPlayer.value.currentTime - 10;
    console.log(
      ">>> Event: rewind was clicked. time after: ",
      videoPlayer.value.currentTime
    );
  }
}

function onPause() {
  console.log(">>> Event: pause was clicked. time: ", videoPlayer.value.currentTime);
}

function onTimeupdate() {
  timer.value = videoPlayer.value.currentTime;
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
  nextTick(() => {
    console.log(">>> video player: ", videoPlayer.value);
    console.log(">>> video player controls: ", videoPlayer.value.controls);
    console.log(">>> video player currentTime ", videoPlayer.value.currentTime);
    videoPlayer.value.addEventListener("pause", onPause);
    videoPlayer.value.addEventListener("timeupdate", onTimeupdate);
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
      <video preload="auto" controls width="500" ref="videoPlayer">
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
      <v-col cols="6">
        <v-toolbar color="primary" dense floating dark>
          <v-btn @click.stop="rewind">rewind</v-btn>
          <v-btn @click.stop="emit('end')">Fim</v-btn>
          <v-btn @click.stop="foward">foward</v-btn>
          <span>video time: {{ timer }}</span>
        </v-toolbar>
      </v-col>
      <!-- <v-btn color="primary" @click.stop="rewind">rewind</v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn color="primary" @click.stop="emit('end')">Fim</v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn color="primary" @click.stop="foward">foward</v-btn>
      </v-col>
      <v-col cols="2">
        <span>video time: {{ timer }}</span>
      </v-col> -->
    </v-row>
  </v-container>
</template>
