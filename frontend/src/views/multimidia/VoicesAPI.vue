<!-- https://github.com/tjFogarty/speech-synthesis -->

<script setup>
import { ref, onMounted } from "vue";
import TalkingAvatar from "@/components/multimidia/talkingAvatar";

const getImageUrl = (name) => {
  return new URL(name, import.meta.url).href;
};

const canvas = ref(null);

const synth = window.speechSynthesis;

const isReady = ref(false);
const isLoading = ref(true);
const text = ref("");
const lang = ref("pt-BR");
const selectedVoice = ref(0);
const voiceList = ref([]);

function getUtterances() {
  if (text.value) {
    return splitUtterances(text.value);
  } else {
    return [
      "Muitas vezes achamos que estamos prontos",
      "Mas, na maioria das vezes",
      "É fato que não estamos",
    ];
  }
}

function splitUtterances(textToSplit) {
  // Splitting each utterance up using punctuation is important.  Intra-utterance
  // punctuation will add silence to the tts which looks bad unless the mouth stops moving
  // correctly. Better to split it into separate utterances so play_for_duration will move when
  // talking, and be on frame 0 when not.
  let utterances = [];

  // split everything betwen deliminators [.?,!], but include the deliminator.
  let substrings = textToSplit.match(/[^.?,!]+[.?,!]?/g);

  if (substrings) {
    for (let i = 0, l = substrings.length; i < l; ++i) {
      let str = substrings[i].trim();

      // Make sure there is something to say other than the deliminator
      let numpunc = (str.match(/[.?,!]/g) || []).length;

      if (str.length - numpunc > 0) {
        utterances.push(str);
      }
    }
  }
  return utterances;
}

function showLang() {
  console.log("Linguagem selecionada: ", lang.value);
}

async function loadAvatarSheet() {
  const tileWidth = 512;
  const tileHeight = 512;
  const tileScale = 0.2;
  const canvasContext = canvas.value.getContext("2d");

  const avatar = new Image();
  // this is: src/views/multimidia/VoicesAPI.vue
  avatar.src = getImageUrl("../../assets/avatar/spriteSheet_phonemes.png");
  avatar.onload = () => {
    // a imagem está carregada
    canvasContext.drawImage(
      avatar,
      0,
      0,
      tileWidth,
      tileHeight,
      0,
      0,
      tileWidth * tileScale,
      tileHeight * tileScale
    );
  };
}

onMounted(() => {
  isReady.value = false;
  loadAvatarSheet();
  // wait for voices to load
  // I can't get FF to work without calling this first
  // Chrome works on the onvoiceschanged function
  voiceList.value = synth.getVoices();

  if (voiceList.value.length) {
    isLoading.value = false;
    selectedVoice.value = voiceList.value[14];
    console.log("voice list: ", voiceList.value);
    console.log("voice list [0]: ", voiceList.value[0]);
    console.log("voice list [14]: ", voiceList.value[14]);
  }

  synth.onvoiceschanged = () => {
    voiceList.value = synth.getVoices();
    isLoading.value = false;
  };
});
</script>

<template>
  <!-- https://github.com/tjFogarty/speech-synthesis -->
  <div id="app">
    <v-card class="mx-auto">
      <v-card-title
        ><span
          class="ml-10 mt-10 text-h5 text-lg-h4 text-decoration-underline text-break"
          >Avatar que fala um texto</span
        ></v-card-title
      >
      <v-card-text class="text-left">
        <v-row>
          <v-col cols="6">
            <v-radio-group v-model="lang" @change="showLang()">
              <v-radio label="Português (BR)" value="pt-BR"></v-radio>
              <v-radio label="Inglês (USA)" value="en-US"></v-radio>
            </v-radio-group>
            <!-- <v-select
              v-model="selectedVoice"
              :items="voiceList"
              item-text="name"
              label="Select a voice"
              outlined
              dense
            ></v-select> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-textarea
              v-model="text"
              label="Text"
              outlined
              clearable
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-btn :disabled="isReady" @click.stop="isReady = true"
              >speak</v-btn
            >
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <talking-avatar
              v-if="isReady"
              :lang="lang"
              :utterances="getUtterances()"
              @end="isReady = false"
            />
            <canvas
              v-show="!isReady"
              ref="canvas"
              :width="220"
              :height="220"
            ></canvas>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
