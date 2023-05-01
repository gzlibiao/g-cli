import { getToken } from "@/utils/core";

const fetch = GDK.fetch;

/**
 * @description: Get user menu based on id
 */
export const getMenuList = () => {
  return fetch.get("/sys/sys/permission/getUserPermissionByToken", {
    "Authorization": getToken(),
    "X-Access-Token": getToken()
  });
};
