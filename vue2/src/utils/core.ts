const TOKEN = Symbol();
// 设置token
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN.toString(), token);
};

// 获取token
export const getToken = (): string => {
  return localStorage.getItem(TOKEN.toString()) || "";
};
