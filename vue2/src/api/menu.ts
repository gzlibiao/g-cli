import { fetch } from "gz-sdk";
import { getToken } from "@/utils/core";

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return fetch.get("/api/sys/permission/getUserPermissionByToken", {
    "Authorization": getToken(),
    "test": "123",
    "X-Access-Token": getToken()
  });
};

/**
 * 切换成vue3菜单
 */
export const switchVue3Menu = () => {
  return fetch.get("/sys/switchVue3Menu");
};
