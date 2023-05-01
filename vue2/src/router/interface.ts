export const ROUTE_NAME_MAP = {
  LAYOUT: "layout",
  HOME: "home",
  ABOUT: "about",
  DEMO: "login",
  LOGIN: "demo",
  NOT_FOUND: "404",
  AI: "ai"
} as const;


import { type RouteMeta } from "vue-router";

export const routes = [
  {
    path: "/",
    // redirect: "/home/index"
    redirect: import.meta.env.VITE_BASE_DEFAULT_URL
  },
  {
    path: "/404",
    name: ROUTE_NAME_MAP.NOT_FOUND,
    component: () => import("@/views/ErrorPage/404.vue")
  },
  {
    path: "/demo",
    name: ROUTE_NAME_MAP.DEMO,
    component: () => import("@/views/Demo/index.vue")
  },
  {
    path: "/login",
    name: ROUTE_NAME_MAP.LOGIN,
    component: () => import("@/views/Account/Login/index.vue")
  },
  {
    path: "/home",
    redirect: "/home/index",
    name: ROUTE_NAME_MAP.LAYOUT,
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "首页",
      icon: "el-icon-s-home"
    },
    children: [
      {
        path: "index",
        name: ROUTE_NAME_MAP.HOME,
        component: () => import("../views/Home/index.vue"),
        meta: {
          title: "首页"
        }
      },
      {
        path: "ai",
        name: ROUTE_NAME_MAP.AI,
        component: () => import("../views/AI/index.vue"),
        meta: {
          title: "ai"
        }
      }
    ]
  }
];
