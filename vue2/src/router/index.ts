import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./interface";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: '/',//import.meta.env.VITE_APP_BASE_URL
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

router.beforeEach(async (to, from, next) => {
  // const userStore = useUserStore();

  // 动态设置标题
  const appTitle = import.meta.env.VITE_APP_NAME;
  document.title = to.meta?.title ? `${to.meta.title} - ${appTitle}` : appTitle;

  // 3.访问需要登录的路由时，拦截未登录用户
  // initDynamicRouter(userStore.menuList);

  // 4.未匹配到的路由跳转到404
  if (to.matched.length === 0) {
    return next('/404');
  }

  next();
});

export default router;
