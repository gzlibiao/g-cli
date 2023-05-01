/**
 * @description: 请求结果集
 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = -1,
  TIMEOUT = 10042,
  TYPE = "success",
}

/**
 *
 * */
export enum ResultCode {
  "请求成功! " = 200,
  "接口重定向了! " = 302,
  "参数不正确! " = 400,
  "您未登录, 或者登录已经超时, 请先登录! " = 401,
  "您还没有权限操作! " = 403,
  "请求地址出错! " = 404,
  "请求超时! " = 408,
  "系统已存在相同数据! " = 409,
  "服务器内部错误! " = 500,
  "服务未实现! " = 501,
  "回答错误! " = 502,
  "服务不可用! " = 503,
  "服务暂时无法访问, 请稍后再试! " = 504,
  "HTTP 版本不受支持! " = 505,
  Default = "异常问题, 请联系管理员! "
}

/**
 * @description: 请求方法
 */
export enum RequestEnum {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

/**
 * @description:  常用的contentTyp类型
 */
export enum ContentTypeEnum {
  // json
  JSON = "application/json;charset=UTF-8",
  // json
  TEXT = "text/plain;charset=UTF-8",
  // form-data 一般配合qs
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data  上传
  FORM_DATA = "multipart/form-data;charset=UTF-8",
}
