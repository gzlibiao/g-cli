import { AUTH_IGNORE } from "./constant";

const progressStart = (to:any, from:any, next:any) => {
  next(true);
};


/**
 * 登录守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
const loginGuard = (to:any, from:any, next:any) => {
  const flag = true;
  // if (!AUTH_IGNORE.includes(to)) {
  //   next(RouteEnum.Login);
  // } else {
  //   next();
  // }
  next(true);
};

/**
 * 权限守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
const authorityGuard = (to:any, from:any, next:any) => {
  // const { store, message } = options
  // const permissions = store.getters['account/permissions']
  // const roles = store.getters['account/roles']
  // if (!hasAuthority(to, permissions, roles)) {
  //   message.warning(`对不起，您无权访问页面: ${to.fullPath}，请联系管理员`)
  //   next({ path: '/403' })
  //   // NProgress.done()
  // } else {
  //   next()
  // }
  next(true);
};

/**
 * 混合导航模式下一级菜单跳转重定向
 * @param to
 * @param from
 * @param next
 * @param options
 * @returns {*}
 */
const redirectGuard = (to:any, from:any, next:any) => {
  // const { store } = options;
  // const getFirstChild = (routes) => {
  //   const route = routes[0];
  //   if (!route.children || route.children.length === 0) {
  //     return route;
  //   }
  //   return getFirstChild(route.children);
  // };
  // if (store.state.setting.layout === "mix") {
  //   const firstMenu = store.getters["setting/firstMenu"];
  //   if (firstMenu.find(item => item.fullPath === to.fullPath)) {
  //     store.commit("setting/setActivatedFirst", to.fullPath);
  //     const subMenu = store.getters["setting/subMenu"];
  //     if (subMenu.length > 0) {
  //       const redirect = getFirstChild(subMenu);
  //       return next({ path: redirect.fullPath });
  //     }
  //   }
  // }
  next(true);
};

/**
 * 进度条结束
 * @param to
 * @param form
 * @param options
 */
const progressDone = ({to,from}:any) => {
  // finish progress bar
};

const documentGuard = (to:any, from:any) => {
  // 动态设置标题
  const appTitle = import.meta.env.VITE_TITLE;
  document.title = to.meta?.title || appTitle;
};

export  const beforeGuard= [progressStart, loginGuard, authorityGuard, redirectGuard];

export const afterGuard= [documentGuard,progressDone];
