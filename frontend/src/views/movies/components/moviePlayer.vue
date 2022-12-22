<script setup>
import { onMounted, ref, reactive } from "vue";

const props = defineProps({
  movieUrl: {
    type: URL,
    required: true,
  },
});

const emit = defineEmits(["end"]);
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
      <video controls width="800" autoplay ref="myVideoPlayer">
        <!-- <source :src="movieUrl" /> -->
        <source src="/extra2/extrema/backend/media/movies/duo01.mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video></v-row
    >
    <v-row no-gutters justify="center" align="center">
      <v-col cols="2">
        <v-btn color="primary" @click.stop="emit('end')">Fim</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
