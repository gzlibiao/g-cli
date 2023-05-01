const fetch=GDK.fetch;

export function login<T, P = Record<string, string>>(params: P): Promise<T> {
  return fetch.post("/sys/sys/login", params, {});
}

export function getCodeInfo<T, P>(key: P): Promise<T> {
  return fetch.get(`/sys/sys/randomImage/${key}`, {});
}
