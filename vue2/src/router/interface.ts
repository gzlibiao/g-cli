export const enum RouteEnum {
  Layout = "layout",
  Home = "home",
  Demo = "demo",
  Login = "login",
  NotFound = "404",
  AI = "ai",
  Theme = "theme"
}

// RouteEnum[RouteEnum.Layout.toString() as RouteEnum.AI]

export const routes = [
  {
    path: "/",
    // redirect: "/home/index"
    redirect: import.meta.env.VITE_BASE_DEFAULT_URL
  },
  {
    path: "/" + RouteEnum.NotFound,
    name: RouteEnum.NotFound,
    component: () => import("@/views/ErrorPage/404.vue")
  },
  {
    path: "/" + RouteEnum.Demo,
    name: RouteEnum.Demo,
    component: () => import("@/views/Demo/index.vue")
  },
  {
    path: "/" + RouteEnum.Login,
    name: RouteEnum.Login,
    component: () => import("@/views/Account/Login/index.vue")
  },
  {
    path: "/home",
    redirect: "/home/index",
    name: RouteEnum.Layout,
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "首页",
      icon: "el-icon-s-home"
    },
    children: [
      {
        path: "index",
        name: RouteEnum.Home,
        component: () => import("../views/Home/index.vue"),
        meta: {
          title: "首页"
        }
      },
      {
        path: "ai",
        name: RouteEnum.AI,
        component: () => import("../views/AI/index.vue"),
        meta: {
          title: "ai"
        }
      },
      {
        path: "theme",
        name: RouteEnum.Theme,
        component: () => import("../views/Theme/index.vue"),
        meta: {
          title: "主题"
        }
      }
    ]
  },
  {
    path: "/*",
    redirect: "/" + RouteEnum.NotFound
  }
];
