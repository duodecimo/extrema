// Components
import App from "./App.vue";
import router from "./router";
// Composables
import { createApp } from "vue";
import { createPinia } from "pinia";
// Plugins
import { registerPlugins } from "@/plugins";
// a parte do vuetify vai ser configurada pelos plugins

const app = createApp(App);

app.use(createPinia());
app.use(router);

registerPlugins(app);

app.mount("#app");