import { createApp } from "vue";
import App from "./App.vue";
import "../src/style/style.css";
import { createWebHashHistory, createRouter } from "vue-router";
import routes from "./router/route.js";
const app = createApp(App);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
app.use(router);
app.mount("#app");
