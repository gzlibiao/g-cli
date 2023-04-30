import { fetch } from "gz-sdk";
import { getToken } from "@/utils/core";
// enum Api {
//   Login = baseUrl + "/sys/login",
//   phoneLogin = baseUrl + "/sys/phoneLogin",
//   Logout = baseUrl + "/sys/logout",
//   GetUserInfo = baseUrl + "/sys/user/getUserInfo",
//   // 获取系统权限
//   // 1、查询用户拥有的按钮/表单访问权限
//   // 2、所有权限
//   // 3、系统安全模式
//   GetPermCode = baseUrl + "/sys/permission/getPermCode",
//   //新加的获取图形验证码的接口
//   getInputCode = baseUrl + "http://boot3.jeecg.com/jeecgboot/sys/randomImage",
//   //获取短信验证码的接口
//   getCaptcha = baseUrl + "/sys/sms",
//   //注册接口
//   registerApi = baseUrl + "/sys/user/register",
//   //校验用户接口
//   checkOnlyUser = baseUrl + "/sys/user/checkOnlyUser",
//   //SSO登录校验
//   validateCasLogin = baseUrl + "/sys/cas/client/validateLogin",
//   //校验手机号
//   phoneVerify = baseUrl + "/sys/user/phoneVerification",
//   //修改密码
//   passwordChange = baseUrl + "/sys/user/passwordChange",
//   //第三方登录
//   thirdLogin = baseUrl + "/sys/thirdLogin/getLoginUser",
//   //第三方登录
//   getThirdCaptcha = baseUrl + "/sys/thirdSms",
//   //获取二维码信息
//   getLoginQrcode = baseUrl + "/sys/getLoginQrcode",
//   //监控二维码扫描状态
//   getQrcodeToken = baseUrl + "/sys/getQrcodeToken",
// }

/**
 * @description: user login api
 */
export function login<T, P = Record<string, string>>(params: P): Promise<T> {
  return fetch.post(
    "http://boot3.jeecg.com/jeecgboot/sys/login",
    params
  );
}

// /**
//  * @description: user phoneLogin api
//  */
// export function phoneLoginApi(params: LoginParams) {
//   return post(
//     Api.phoneLogin,
//     params
//   );
// }
//
// /**
//  * @description: getUserInfo
//  */
// export function getUserInfo() {
//   return get({ url: Api.GetUserInfo }, {}).catch((e) => {
//     if (e && (e.message.includes("timeout") || e.message.includes("401"))) {
//       //接口不通时跳转到登录界面
//       // const userStore = useUserStoreWithOut();
//       // userStore.setToken('');
//       // setAuthCache(TOKEN_KEY, null);
//       // router.push(PageEnum.BASE_LOGIN);
//     }
//     // update-end--author:zyf---date:20220425---for:【VUEN-76】捕获接口超时异常,跳转到登录界面
//   });
// }
//
// export function getPermCode() {
//   return get(Api.GetPermCode);
// }
//
// export function doLogout() {
//   return get(Api.Logout);
// }
//
export function getCodeInfo<T, P>(key: P): Promise<T> {
  return fetch.get(`http://boot3.jeecg.com/jeecgboot/sys/randomImage/${key}`);
}

// /**
//  * @description: 获取短信验证码
//  */
// export function getCaptcha<T, P>(params: P): Promise<T> {
//   return new Promise((resolve, reject) => {
//     fetch.post(params).then((res) => {
//       console.log(res);
//       if (res.success) {
//         resolve(true);
//       } else {
//         // createErrorModal({ title: '错误提示', content: res.message || '未知问题' });
//         reject();
//       }
//     });
//   });
// }
//
// /**
//  * @description: 注册接口
//  */
// export function register(params) {
//   return defHttp.post({ url: Api.registerApi, params }, { isReturnNativeResponse: true });
// }
//
// /**
//  *校验用户是否存在
//  * @param params
//  */
// export const checkOnlyUser = (params) => defHttp.get({
//   url: Api.checkOnlyUser,
//   params
// }, { isTransformResponse: false });
// /**
//  *校验手机号码
//  * @param params
//  */
// export const phoneVerify = (params) => defHttp.post({ url: Api.phoneVerify, params }, { isTransformResponse: false });
// /**
//  *密码修改
//  * @param params
//  */
// export const passwordChange = (params) => defHttp.get({
//   url: Api.passwordChange,
//   params
// }, { isTransformResponse: false });
//
// /**
//  * @description: 第三方登录
//  */
// export function thirdLogin(params, mode: ErrorMessageMode = "modal") {
//   return defHttp.get<LoginResultModel>(
//     {
//       url: `${Api.thirdLogin}/${params.token}/${params.thirdType}`
//     },
//     {
//       errorMessageMode: mode
//     }
//   );
// }
//
// /**
//  * @description: 获取第三方短信验证码
//  */
// export function setThirdCaptcha(params) {
//   return new Promise((resolve, reject) => {
//     defHttp.post({ url: Api.getThirdCaptcha, params }, { isTransformResponse: false }).then((res) => {
//       console.log(res);
//       if (res.success) {
//         resolve(true);
//       } else {
//         createErrorModal({ title: "错误提示", content: res.message || "未知问题" });
//         reject();
//       }
//     });
//   });
// }
//
// /**
//  * 获取登录二维码信息
//  */
// export function getLoginQrcode() {
//   let url = Api.getLoginQrcode;
//   return defHttp.get({ url: url });
// }
//
// /**
//  * 监控扫码状态
//  */
// export function getQrcodeToken(params) {
//   let url = Api.getQrcodeToken;
//   return defHttp.get({ url: url, params });
// }
//
// /**
//  * SSO登录校验
//  */
// export async function validateCasLogin(params) {
//   let url = Api.validateCasLogin;
//   return defHttp.get({ url: url, params });
// }
