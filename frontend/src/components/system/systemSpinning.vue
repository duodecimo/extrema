<script setup>
import { useSystemStore } from "@/stores/system";
import { watchEffect } from "vue";
const systemStore = useSystemStore();
watchEffect(() => {
  console.log(
    "Em systemSpinning - watchEffect - loading: ",
    systemStore.loading
  );
});
</script>

<template>
  <div v-if="systemStore.loading">
    <v-overlay v-model="systemStore.loading" />
    <v-dialog class="pa-16 pa-md-0" v-model="systemStore.loading">
      <v-progress-circular indeterminate :size="64"></v-progress-circular>
    </v-dialog>
  </div>
</template>
