import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./view/router/router";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

const app = createApp(App);
app.use(router);
app.use(ElementPlus, { size: "small" });
app.mount("#app");
