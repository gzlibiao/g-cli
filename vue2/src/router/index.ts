import Vue from "vue";
import VueRouter from "vue-router";
import { defaultRoutes, layoutRoute } from "./constant";
import { routes, layoutRoutes } from "./routes";
import { beforeGuard, afterGuard } from "./guards";

Vue.use(VueRouter);

export function useRouter() {
  return router;
}

export function useRoute() {
  return router.currentRoute;
}

// 解决重复点击导航路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return (originalPush.call(this, location) as unknown as Promise<any>).catch(err => err);
};

function getRoutes() {
  const result = [].concat(routes as []).concat({ ...layoutRoute, children: layoutRoutes }).concat(defaultRoutes as []);
  return result;
}

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.VITE_BASE_URL,
  scrollBehavior(from, to) {
    return { x: 0, y: 0 };
  },
  routes: getRoutes()
});

router.beforeEach(async (to, from, next) => {
  const nextGuard = (guardResult: string | boolean) => {
    if (!guardResult) {
      return;
    }

    if (typeof guardResult === "boolean") {
      const guard = beforeGuard.pop();
      if (!guard) {
        next();
        return;
      }

      return guard(to, from, nextGuard);
    }

    next(guardResult);
  };

  nextGuard(true);
});

router.afterEach((to, from) => {
  afterGuard.forEach(guard => guard(to, from));
});

export default router;
