export const ROUTE_NAME_MAP: Record<string, string> = {
  HOME: "home",
  ABOUT: "about",
};

export const routes = [
  {
    path: "/",
    name: ROUTE_NAME_MAP.HOME,
    redirect: "/about",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/about",
    name: ROUTE_NAME_MAP.ABOUT,
    component: () => import("../views/AboutView.vue"),
  },
];
