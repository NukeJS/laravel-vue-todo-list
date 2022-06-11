import { createApp } from "vue";
import App from "./App.vue";
import "./assets/app.css";

import router from "./router";
import ToastsPlugin from "./plugins/toasts";

createApp(App).use(router).use(ToastsPlugin).mount("#app");
