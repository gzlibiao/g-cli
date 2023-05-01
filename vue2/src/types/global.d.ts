export {};

declare module "gz-sdk" {
  export { type IResult, toResult } from "gz-sdk";
}

declare module "axios" {
  export interface CustomOptions {
    showLoading?: boolean; // 发送请求时是否显示全局loading，默认false
    showMessage?: boolean; // 后端返回结果有message时是否弹出提示，默认true
    loginAgain?: boolean; // 发送请求时会话过期是否自动跳转到登录页，默认false
  }

  export interface AxiosRequestConfig {
    customOptions?: CustomOptions;
    loadingServer?: { close: () => void };
  }

  export interface AxiosRequestHeaders {
    "uni-Id-token": string;
    "uni-platform": string;
    "app-id": string;
    locale: string; // 语言，zh-Hans:中文、en:英文
    "device-id": string; // 设备ID，由前端根据设备信息生成
  }
}

declare module "vue-router" {

  import { getRouter, getRoute } from "vue-router";

  export { getRoute, getRouter };

  export interface RouteMeta {
    title: string; // 路由标题
    icon?: string; // 路由的图标
    authRequired?: boolean; // 是否登录才能访问
    showInMenu?: boolean; // 是否显示在首页菜单里
    activeMenu?: string; // 当前路由为活跃路由时激活的菜单，不配置时默认为route.path
    accessible?: boolean; // 当前登录的用户是否有权限访问，不能访问时路由组件将会渲染成 401.vue，无论component配置成了什么
    inner?: boolean; // 是否为内部路由，为外部路由时在菜单点击将调用window.open打开一个新窗口
    canClose?: boolean; // 在 tabBar 中是否可关闭
    keepAlive?: boolean; // 是否缓存路由组件
  }
}
