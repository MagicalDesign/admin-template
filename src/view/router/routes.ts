import { RouteRecordRaw, RouterOptions } from "vue-router";

import Home from "../Home.vue";

export const routes = <RouteRecordRaw[]>[
  {
    path: "/",
    component: Home,
  },
];
