import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { ResultCode } from "@/enums/common.enum";

import { type IResult, toResult } from "gz-sdk";

const serverConfig = {
  baseURL: "/ai" || import.meta.env.VITE_BASE_SERVER_BASE_URL,
  useTokenAuthorization: false
};

const http = new Proxy<AxiosInstance>(axios.create({
  baseURL: serverConfig.baseURL, //基础请求地址
  timeout: 1 * 1000, //请求超时设置
  withCredentials: false // 跨域请求是否需要携带 cookie
}), {});

// 请求头
interface RequestConfig extends InternalAxiosRequestConfig {
  params?: string;
  uploadFile?: boolean;
}

// 请求队列
const reqQueue = new Map();

// 请求拦截
http.interceptors.request.use(
  (config: RequestConfig) => {
    // 检查是否重复发送请求
    removereqQueue(config);
    //将本次请求加入请求队列
    addreqQueue(config);

    // 是否使用 token鉴权
    if (serverConfig.useTokenAuthorization) {
      config.headers["Authorization"] = localStorage.getItem("token");
    }

    config.headers["content-type"] = "application/json";

    // 设置请求头
    if (config.method === "post") {
      config.headers["content-type"] = "application/x-ww-form-urlencoded";
      // config.data = qs.stringify(config.data); //序列化  效果等同于下行代码
      // config.requestType = 'form'
    }

    // 文件上传
    if (config.uploadFile) {
      config.method = "post";
      config.headers["content-type"] = "multipart/form-data";
    }

    // 返回
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 响应拦截
http.interceptors.response.use(
  (res) => {
    removereqQueue(res.config as RequestConfig); //请求从请求队列移除
    const data = res.data;
    // 处理自己的业务逻辑,如 token 是否过期...
    return data;
  },
  (error) => {
    removereqQueue(error.config || {}); //请求从请求队列移除
    console.warn("请求异常===>", typeof error?.response?.status, error);
    Message.error(ResultCode[Number(error?.response?.status)] || ResultCode.Default);

    return {
      code: 500,
      error,
      msg: ResultCode[Number(error?.response?.status)] || ResultCode.Default
    } as IResult;
  }
);

// 生成此次请求唯一key
function generateReqKey(config: RequestConfig): string {
  const { method, url, params } = config;
  return [method, url, JSON.stringify(params || {})].join("&");
}

// 取消所有请求
export function clearPending(): void {
  for (const [requestKey, cancelToken] of reqQueue) {
    cancelToken(requestKey);
  }
  reqQueue.clear();
}

// 将请求加入请求队列函数
function addreqQueue(config: RequestConfig): void {
  //调用生成唯一标识值函数, 生成 requestKey
  const requestKey = generateReqKey(config);

  //为每个请求创建一个专属的 CancelToken(用于取消请求)
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    // 判断 reqQueue 中是否含有 requestKey,
    // 将 requestKey 与 CancelToken 以键值对的形式保存到map对象中
    if (!reqQueue.has(requestKey)) {
      reqQueue.set(requestKey, cancel);
    }
  });
}

// 从请求队列中删除
function removereqQueue(config: RequestConfig): void {
  // 标识值
  const requestKey = generateReqKey(config);

  if (reqQueue.has(requestKey)) {
    // 取消之前发出请求
    const cancelToken = reqQueue.get(requestKey);
    cancelToken(requestKey);
    // 从队列移除
    reqQueue.delete(requestKey);
  }
}

export const post = <T>(url: string, data: {}): Promise<T> => {
  return http({ url, method: "post", data });
};

export const put = (url: string, data: {}): Promise<AxiosInstance> => {
  return http({ url, method: "put", data });
};

export const get = <T>(url: string, data?: T): Promise<AxiosInstance> => {
  return http({ url, method: "get", data });
};

export const del = <T>(url: string, data?: T): Promise<AxiosInstance> => {
  return http({ url, method: "delete", data });
};

export function registryHttpUrl(baseUrl: string): Proxy<AxiosInstance> {
  Object.assign(http, { baseUrl });
  return http;
}

export default http;
