// import { localStorage } from "gz-sdk";

export const STORE_TOKEN_KEY = "STORE_TOKEN_KEY";
// 设置token
export const setToken = (token: string): void => {
  localStorage.set(STORE_TOKEN_KEY, token);
};

// 获取token
export const getToken = (): string => {
  return localStorage.get(STORE_TOKEN_KEY.toString());
};

interface IResult<T> {
  success: boolean,
  data: T,
}

export const toResult = <T>(data: T, success = true): IResult<T> => {
  return {
    success,
    data
  };
};
