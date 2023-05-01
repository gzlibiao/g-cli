import { fetch,postMessage } from "gz-sdk";


export function login<T, P = Record<string, string>>(params: P): Promise<T> {
  return fetch.post("/api/sys/login", params, {});
}

export function getCodeInfo<T, P>(key: P): Promise<T> {
  return fetch.get(`/api/sys/randomImage/${key}`, {});
}
