<script setup>
import { useSystemStore } from "@/stores/system";
import { reactive, ref, watchEffect } from "vue";
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
import SystemSpinning from "@/components/system/systemSpinning.vue";
import SnackMessenger from "@/components/utils/snackMessenger.vue";

const { mdAndDown } = useDisplay();
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
  email: "",
  password: "",
});

function login() {
  systemStore
    .login(payload)
    .then((response) => {
      console.log("Em SystemLogin - login - resultado: ", response);
      message.value = "Sucesso entrando no sistema.";
      success.value = true;
    })
    .catch((err) => {
      console.log("> Em SystemLogin - login - erro: ", err.message);
      message.value = "Erro: " + err.message;
    });
  console.log("Em SystemLogin - login - auth: ", systemStore.auth);
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
      <v-col cols="12" md="10">
        <v-form>
          <v-container>
            <v-row
              ><v-col cols="12" md="8">
                <span class="text-h5 text-lg-h3 text-break">Acesso ao sistema</span>
              </v-col></v-row
            >
            <v-row>
              <v-col cols="2" />
              <v-col cols="10" class="text-left">
                <span class="text-h4 text-lg-h3 text-break">email</span>
                <v-text-field
                  counter="35"
                  required
                  v-model="payload.email"
                  placeholder="Seu e-mail ..."
                  outlined
                  :dense="mdAndDown"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" />
              <v-col cols="6" class="text-left">
                <span class="text-h4 text-lg-h3 text-break">senha</span>
                <v-text-field
                  :counter="12"
                  required
                  v-model="payload.password"
                  placeholder="Sua senha ..."
                  type="password"
                  outlined
                  :dense="mdAndDown"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8">
                <v-btn
                  v-if="ambiente === 'development'"
                  color="primary"
                  :disabled="success"
                  :x-small="mdAndDown"
                  @click="fakeLogin()"
                  icon="mdi-skull-crossbones"
                ></v-btn
              ></v-col>
              <v-col cols="4">
                <v-btn
                  variant="flat"
                  color="primary"
                  :disabled="success"
                  prepend-icon="mdi-login"
                  :x-small="mdAndDown"
                  @click.stop="login"
                  >entrar
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
