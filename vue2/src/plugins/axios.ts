import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

const serverConfig = {
  baseURL: import.meta.env.VITE_BASE_SERVER_BASE_URL,
  useTokenAuthorization: false
};

const http = axios.create({
  baseURL: serverConfig.baseURL, //基础请求地址
  timeout: 1000 * 10, //请求超时设置
  withCredentials: false // 跨域请求是否需要携带 cookie
});

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
    let message = "";
    if (error && error.response) {
      const errMap: Record<number, string> = {
        302: "接口重定向了! ",
        400: "参数不正确! ",
        401: "您未登录, 或者登录已经超时, 请先登录! ",
        403: "您还没有权限操作! ",
        404: "请求地址出错! ",
        408: "请求超时! ",
        409: "系统已存在相同数据! ",
        500: "服务器内部错误! ",
        501: "服务未实现! ",
        502: "回答错误! ",
        503: "服务不可用! ",
        504: "服务暂时无法访问, 请稍后再试! ",
        505: "HTTP 版本不受支持! "
      };
      message = errMap[error.response.status] || "异常问题, 请联系管理员!";
    }
    return Promise.reject(message);
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

export const get = (url: string, data: {} | undefined): Promise<AxiosInstance> => {
  return http({ url, method: "get", data });
};

export const del = (url: string, data: {} | null): Promise<AxiosInstance> => {
  return http({ url, method: "delete", data });
};

export default http;
