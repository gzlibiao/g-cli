import { fetch } from "gz-sdk";

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return fetch.get("/sys/permission/getUserPermissionByToken");
};

/**
 * 切换成vue3菜单
 */
export const switchVue3Menu = () => {
  return fetch.get("/sys/switchVue3Menu");
};
