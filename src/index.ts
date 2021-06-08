import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./view/router/router";
const app = createApp(App);
app.use(router);
app.mount("#app");
