# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Create project

> npm init vue@latest

```
✔ Project name: … vue-project
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit Testing? … No / Yes
✔ Add an End-to-End Testing Solution? › No
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
```

Atenção, como eu criei o repositório remoto e clonei, o clone vai para a pasta com o nome do projeto: /eat-frontend.
O ideal seria, nas escolhas acima, utilizar a pasta atual em

> Project name: .
> Mas, a criação do projeto detecta que a pasta não está vazia, e insiste em apagá-la para continuar.
> Então, criei o projeto vue 3 na pasta padrão vue-project e depois transferí todos os arquivos e pastas
> (cuidando em especial dos que iniciam por .) para .. (e apaguei a pasta vue-project, garantindo que estava vazia).

## Adicionando Vuetify

> npm install vuetify@^3.0.1

> npm install --save-dev vite-plugin-vuetify

Adicione as referencias do vuetify à src/main.js:

```
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

```

## plugins e main.js

na pasta src/plugins, usaremos 3 arquivos:

> plugins/index.js

```
/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";

export function registerPlugins(app) {
  loadFonts();
  app.use(vuetify);
}

```

> plugins/vuetify.js

```
/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1867C0",
          secondary: "#5CBBF6",
        },
      },
    },
  },
});

```

> plugins/webfontloader.js

```
/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts() {
  const webFontLoader = await import(
    /* webpackChunkName: "webfontloader" */ "webfontloader"
  );

  webFontLoader.load({
    google: {
      families: ["Roboto:100,300,400,500,700,900&display=swap"],
    },
  });
}

```

Adicione referencias do vuetify a vite.config.js:

```
// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 3000,
  },
});

```

## Json

Crie o arquivo jsonconfig.json:

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  }
}

```

## install axios

> npm install axios

## Upgrade your packages

> npx npm-check-updates -u

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
