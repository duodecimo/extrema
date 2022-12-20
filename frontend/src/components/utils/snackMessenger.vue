<script setup>
import { onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify";
const props = defineProps({
  message: { type: String, required: true },
  timeout: { type: Number, default: 5000 },
});
const { mdAndDown } = useDisplay();
const snackbar = ref(true);
const emit = defineEmits(["dismissed"]);
watch(snackbar, () => {
  console.log(">> Emitting dismissed");
  emit("dismissed");
});
onMounted(() => {
  console.log("snackMensager mounted.");
  console.log("props: ", props);
});
</script>

<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      :timeout="props.timeout"
      color="secondary"
      location="center"
    >
      <v-icon left>mdi-information-outline</v-icon>
      <span class="text-subtitle-1 text-lg-h6 text-break">{{
        props.message
      }}</span>
      <template v-slot:actions>
        <v-btn
          class="ml-3"
          color="primary"
          icon="mdi-close"
          depressed
          :x-small="mdAndDown"
          @click.stop="$emit('dismissed')"
        ></v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
