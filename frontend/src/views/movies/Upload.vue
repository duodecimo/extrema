<script setup>
import { useMoviesStore } from "@/stores/movies";
import { useSystemStore } from "@/stores/system";
import { reactive, ref, watchEffect } from "vue";
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
import SystemSpinning from "@/components/system/systemSpinning.vue";
import SnackMessenger from "@/components/utils/snackMessenger.vue";

const { mdAndDown } = useDisplay();
const moviesStore = useMoviesStore();
const systemStore = useSystemStore();
const router = useRouter();
const message = ref(null);
const success = ref(false);
watchEffect(() => {
  if (success.value && !message.value) {
    // vamos navegar para home
    // condições: sucesso no login e snackMenssender dismissed.
    console.log(">> watch success: ", success.value, " message: ", message.value);
    router.push("/");
  }
  console.log("Em SystemLogin - watchEffect - loading: ", systemStore.loading);
});
const payload = reactive({
  title: "",
  is_active: true,
  url: "",
  user: 0,
});

movieRules: [
  (value) => {
    return (
      !value ||
      !value.length ||
      value[0].size < 9000000 ||
      "O tamanho do filme deve ser menor que 9 MB!"
    );
  },
];

function uploadMovie() {
  console.log("Em Upload.vue - uploadMovie() - payload.title: ", payload.title);
  console.log("Em Upload.vue - uploadMovie() - payload.is_active: ", payload.is_active);
  console.log("Em Upload.vue - uploadMovie() - payload.url[0]: ", payload.url[0]);
  let formData = new FormData();
  formData.append("user", systemStore.auth.userid);
  formData.append("url", payload.url[0], payload.url[0].name);
  formData.append("is_active", true);
  formData.append("title", payload.title);
  console.log("Em Upload.vue - uploadMovie() - formData: ", formData);
  moviesStore
    .uploadMovie(formData)
    .then((response) => {
      console.log("Em Upload.vue - uploadMovie() - resultado: ", response);
      message.value = "Sucesso!";
      success.value = true;
    })
    .catch((err) => {
      console.log("> Em Upload.vue - uploadMovie() - erro: ", err.message);
      message.value = "Erro: " + err.message;
    });
}
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

    <v-card class="mx-auto">
      <v-card-title
        ><span class="ml-10 mt-10 text-h4 text-lg-h3 text-decoration-underline text-break"
          >Movies: Upload</span
        ></v-card-title
      >
      <v-card-subtitle></v-card-subtitle>
      <v-card-text class="text-left">
        <v-row no-gutters justify="center" align="center">
          <v-col cols="6"
            ><v-progress-linear
              v-if="current_file"
              v-model="progress"
              color="light-blue"
              height="25"
              reactive
            >
              <strong>{{ progress }} %</strong>
            </v-progress-linear></v-col
          ></v-row
        >
        <v-row no-gutters justify="center" align="center"
          ><v-col cols="12" md="8">
            <span class="text-h5 text-lg-h3 text-break">Título do filme</span> </v-col
          ><v-col cols="12" md="8" class="text-left">
            <v-text-field
              counter="35"
              required
              v-model="payload.title"
              placeholder="título do filme ..."
              outlined
              :dense="mdAndDown"
            />
          </v-col>
          <v-col cols="12" md="8"
            ><span class="ml-10 mt-10 text-h5 text-lg-h4"
              >Selecione um filme para upload</span
            ></v-col
          ><v-col cols="6">
            <v-file-input
              :rules="movieRules"
              v-model="payload.url"
              label="Filme"
              variant="filled"
              prepend-icon="mdi-movie"
              placeholder="Escolha um filme para upload"
              show-size
              accept="video/*"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center" align="center">
          <v-col cols="2">
            <v-btn color="primary" @click.stop="uploadMovie()">upload</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
