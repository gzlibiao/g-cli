// 不需要登录拦截的路由
export const AUTH_IGNORE = ["NoAccess", "Register", "Login", "NotFound"];

export const defaultRoutes = [
  {
    path: "/",
    redirect: import.meta.env.VITE_BASE_DEFAULT_URL
  },
  {
    path: "/NotFound",
    name: "NotFound",
    component: () => import("@/views/Exception/404.vue")
  },
  {
    path: "/*",
    redirect: "/NotFound"
  }
];

export const layoutRoute: any = {
  name: "Layout",
  path: "/layout",
  component: () => import("@/layout/index.vue"),
  children: []
};

export const ROUTE_MAP: Record<string, any> = {
  Home: {
    meta: {
      title: "首页",
      layout: true
    }
  },
  Theme: {
    meta: {
      title: "主题",
      layout: true
    }
  },
  AI: {
    meta: {
      title: "ai",
      layout: true
    }
  }
};

export const isLayoutPage = (routeName: string): boolean => {
  return !!ROUTE_MAP[routeName]?.meta?.layout;
};
