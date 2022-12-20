// receives a set of utterances and speeches them

<script setup>
import { onMounted, ref, reactive } from "vue";

const getImageUrl = (name) => {
  return new URL(name, import.meta.url).href;
};

const props = defineProps({
  utterances: {
    type: Array,
    default: () => ["Alo, Mundo!"],
  },
  lang: {
    type: String,
    default: "pt-BR",
  },
});

const emit = defineEmits(["end"]);

// const avatarTiles = [
//   { letters: "bmp", src: "bmp.jpg" },
//   { letters: "aei", src: "aei.jpg" },
//   { letters: "cdnstxyz", src: "cdnstxyz.jpg" },
// ];
// const images = ref(null);
const canvas = ref(null);
const canvasContext = reactive({});
const synth = window.speechSynthesis;
const speechSynth = new window.SpeechSynthesisUtterance();
const isLoading = ref(false);
const tileIdx = ref(0);
const tilesPos = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 3, y: 2 },
];
const tileWidth = 512;
const tileHeight = 512;
const tileScale = ref(0.2);
const speakTimeOut = ref(null);
const avatar = ref(null);
const utterancePhonemes = ref([]);
const utteranceIdx = ref(0);
const phonemeIdx = ref(0);

onMounted(() => {
  console.log("utterances: ", props.utterances);
  tileIdx.value = 0;
  utteranceIdx.value = 0;
  loadAvatarSheet();
});

/**
 * React to speech events
 */
function listenForSpeechEvents() {
  speechSynth.onstart = (event) => {
    console.log("Starting, about to speak " + event.charLength + " caracteres.");
    isLoading.value = true;
    // animateUtterance();
    animateTiles();
  };
  speechSynth.onend = (event) => {
    tileIdx.value = 0;
    clearTimeout(speakTimeOut.value);
    drawTile();
    phonemeIdx.value = 0;
    utteranceIdx.value += 1;
    if (utteranceIdx.value < props.utterances.length) {
      // there is a new utterance to be spoken
      speak(props.utterances[utteranceIdx.value]);
    } else {
      // no new utterances
      console.log(">>>End of talking<<<");
      emit("end");
    }
    isLoading.value = false;
    console.log("Finished in " + event.elapsedTime + " seconds.");
  };
}

function letterToTile(letter) {
  const tilesMap = [
    "AEI",
    "FV",
    "O",
    "HJ",
    "CDGKNSTXYZ",
    "BMP",
    "R",
    "U",
    "I",
    "L",
    "QW",
  ];
  var idx = 0;
  var idxRet = 0;
  tilesMap.forEach((element) => {
    // console.log(
    //   "In letterToTile() - letter: ",
    //   letter,
    //   " element: ",
    //   element
    // );
    if (element.includes(letter)) {
      // console.log("Encontrado no indice: ", idx);
      idxRet = idx;
    }
    idx++;
  });
  return idxRet;
}

/**
 * Returns an array of pairs of tiles,
 * corresponding to the tiles of each syllable present
 * on a utterance
 */
function getUtterancePhonemes(utterance) {
  utterancePhonemes.value = [];
  // let pairs = [];
  const re = /(?:[cC][hH]|[lL][lL]|[rR][rR]|[qQ][uU]|[mnñvzsyjhxwMNÑVZSYJHXW]|[fpbtdkgcFPBTDKGC][lrLR]?|[lrLR])?(?:[iuüIUÜ][eaoéáóEAOÉÁÓ][iyuIYU]|[aáAÁ][hH]?[uúUÚ][aáAÁ]|[iuüIUÜ][hH]?[eaoéáóEAOÉÁÓ]|[eaoéáóEAOÉÁÓ][hH]?[iyuIYU]|[iíIÍ][hH]?[uúUÚ]|[uúüUÚÜ][hH]?[iíyIÍY]|[ieaouíéáóúüIEAOUÍÉÁÓÚÜ])(?:(?:(?:(?:[nmNM]|[rR](?![rR]))s?(?![ieaouíéáóúüIEAOUÍÉÁÓÚÜ]))|(?:(?:[mnñvzsyjhxwMNÑVZSYJHXW]|[lL](?![lL]))(?![ieaouíéáóúüIEAOUÍÉÁÓÚÜ]))|(?:(?:[fpbtdkgFPBTDKG]|[cC](?![hH]))(?![lrLR]?[ieaouíéáóúüIEAOUÍÉÁÓÚÜ])))(?!\s|$))?(?:[ndrlsxNDRLSX](?=\s|$))?/gm;
  var normalized = utterance.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  normalized = normalized.toUpperCase();
  const words = normalized.split(" ");
  // console.log("Em getUtterancePhonemes() - words: ", words.toString());
  words.forEach((word) => {
    const phonemes = word.match(re);
    // console.log("phonemes: ", phonemes.toString());
    phonemes.forEach((phoneme) => {
      utterancePhonemes.value.push(letterToTile(phoneme.charAt()));
      utterancePhonemes.value.push(letterToTile(phoneme.slice(-1)));
      // const pair = [];
      // pair.push(letterToTile(phoneme.charAt()));
      // pair.push(letterToTile(phoneme.slice(-1)));
      // pairs.push(pair);
    });
  });
  // return pairs;
}

function animateTiles() {
  speakTimeOut.value = setTimeout(() => {
    tileIdx.value = utterancePhonemes.value[phonemeIdx.value];
    if (phonemeIdx.value - 1 < utterancePhonemes.value.length) {
      phonemeIdx.value++;
    } else {
      // esgotou os phonemas, não muda mais até o final
      tileIdx.value = 0;
    }
    if (!tileIdx.value) {
      tileIdx.value = 0;
    }
    drawTile();
    animateTiles();
  }, 100);
}

function drawTile() {
  try {
    canvasContext.value.drawImage(
      avatar.value,
      tilesPos[tileIdx.value].x * tileWidth,
      tilesPos[tileIdx.value].y * tileHeight,
      tileWidth,
      tileHeight,
      0,
      0,
      tileWidth * tileScale.value,
      tileHeight * tileScale.value
    );
  } catch (error) {
    console.log(
      "In drawTile() - Error: ",
      error,
      " tileIdx: ",
      tileIdx.value,
      " tilesPos lenght: ",
      tilesPos.length
    );
  }
}

async function speak(utterance) {
  phonemeIdx.value = 0;
  await getUtterancePhonemes(utterance);
  speechSynth.text = utterance; // Gets and sets the text that will be synthesized when the utterance is spoken.
  //   speechSynth.voice = props.voice; // Gets and sets the voice that will be used to speak the utterance.
  speechSynth.lang = props.lang; // Gets and sets the language of the utterance.
  //   speechSynth.volume = props.volume; // Gets and sets the volume that the utterance will be spoken at.
  //   speechSynth.rate = props.rate; // Gets and sets the speed at which the utterance will be spoken at.
  //   speechSynth.pitch = 0.2; // props.pitch; // Gets and sets the pitch at which the utterance will be spoken at.
  speechSynth.volume = 1;
  await synth.speak(speechSynth);
}

// function pause() {
//   synth.pause();
// }

function loadAvatarSheet() {
  canvasContext.value = canvas.value.getContext("2d");
  avatar.value = new Image();
  // this is: src/components/multimidia/talkingAvatar.vue
  avatar.value.src = getImageUrl("../../assets/avatar/spriteSheet_phonemes.png");
  avatar.value.onload = () => {
    // a imagem está carregada
    // checkAvatarSheet();
    start();
  };
}

// function checkAvatarSheet() {
//   tileIdx.value = 8;
//   canvasContext.value.drawImage(
//     avatar.value,
//     tilesPos.value[tileIdx.value].x * tileWidth,
//     tilesPos.value[tileIdx.value].y * tileHeight,
//     tileWidth,
//     tileHeight,
//     0,
//     0,
//     tileWidth * tileScale.value,
//     tileHeight * tileScale.value
//   );
// }

async function start() {
  listenForSpeechEvents();
  setTimeout(() => {
    speak(props.utterances[utteranceIdx.value]);
  }, 500);
}
</script>

<template>
  <v-row justify="center">
    <v-col>
      <canvas id="canvas" ref="canvas" :width="220" :height="220"></canvas>
    </v-col>
  </v-row>
</template>
