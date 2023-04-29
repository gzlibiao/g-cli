export const ROUTE_NAME_MAP: Record<string, string> = {
  HOME: "home",
  ABOUT: "about",
};

export const routes = [
  {
    path: "/",
    name: ROUTE_NAME_MAP.HOME,
    component: () => import("@/views/index.vue"),
  },
];
