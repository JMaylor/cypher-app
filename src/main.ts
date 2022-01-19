import { createApp } from "vue";
import { createPinia } from "pinia";
import "./main.css";
import App from "./App.vue";
import router from "./router";
import "@purge-icons/generated";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
