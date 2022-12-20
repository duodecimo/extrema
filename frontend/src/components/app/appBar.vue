<script setup>
import { useSystemStore } from "@/stores/system";
const systemStore = useSystemStore();
const emit = defineEmits(["drawer"]);
</script>

<template>
  <div>
    <v-app-bar app color="primary" absolute dark>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="emit('drawer')"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title
        ><span class="text-h5 text-lg-h3 white--text text-uppercase text-break"
          >EXTREMA</span
        ></v-app-bar-title
      >

      <template v-slot:append>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
      <v-spacer></v-spacer>
      <v-icon
        v-if="systemStore.auth"
        class="ma-5"
        large
        dark
        icon="mdi-account-lock-open"
      >
      </v-icon>
      <v-icon v-else class="ma-5" large dark icon="mdi-account-lock"></v-icon>
      <!-- <v-btn class="ma-5" icon @click="$emit('login')">
        entrar
        <v-icon dark right>mdi-login</v-icon>
      </v-btn>
      <v-btn class="ma-5" icon @click="$emit('logout')">
        sair
        <v-icon dark right>mdi-logout</v-icon>
      </v-btn> -->

      <v-menu location="end">
        <template v-slot:activator="{ props }">
          <v-btn icon color="primary" dark v-bind="props">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>
