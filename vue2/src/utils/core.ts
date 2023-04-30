const TOKEN = Symbol();
// 设置token
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN.toString(), token);
};

// 获取token
export const getToken = (): string => {
  return localStorage.getItem(TOKEN.toString()) || "";
};

interface IResult<T> {
  success: boolean,
  data: T,
}

export const toResult = <T>( data: T,success = true): IResult<T> => {
  return {
    success,
    data
  };
};
