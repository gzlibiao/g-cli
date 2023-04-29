import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "../common/routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

Vue.use(VueRouter);

export default router;
