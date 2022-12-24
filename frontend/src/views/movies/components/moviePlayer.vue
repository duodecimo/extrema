<script setup>
import { onMounted, ref, reactive } from "vue";

const props = defineProps({
  movieUrl: {
    type: URL,
    required: true,
  },
});

const emit = defineEmits(["end"]);

const isPlaying = ref(false);

const videoPlayer = ref(null);

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

onMounted(() => {
  console.log("In moviePlayer - onMounted() - video: ", videoPlayer.value);
  console.log("In moviePlayer - onMounted() - video src: ", videoPlayer.value.src);
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
          :timeout="12000"
          @dismissed.once="message = null"
        />
      </div>
    </v-row>
    <v-row justify="center">
      <video controls width="500" ref="videoPlayer">
        <source :src="movieUrl" />
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
