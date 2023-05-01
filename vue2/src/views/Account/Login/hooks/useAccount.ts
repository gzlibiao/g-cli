import { login as loginApi, getCodeInfo } from "@/api/system/user";
import { setToken, getToken, toResult } from "@/utils/core";

const user: {
  value: string | null | {}
} = {
  value: null
};


export const useUser = (): {} => {

  const loginModel = reactive<{
    username: string,
    password: string,
    checkPass?: string,
    captcha: string,
    checkKey: string,
  }>({
    username: "jeecg",
    password: "123456",
    checkPass: "123456",
    captcha: "",
    checkKey: Date.now() + ""
  });

  const loggedIn = computed(() => Boolean(user.value));

  function getCodeUrl() {
    return getCodeInfo(loginModel.checkKey);
  };

  function logout(): void {
    user.value = "";
    Message.success("登出成功");
  }

  // 验证密码
  function validatePass(callback: Function): void {
    const { password } = loginModel;
    if (!password) {
      callback(new Error("密码不能为空!"));
      return;
    }
    if (password.length < 6) {
      callback(new Error("密码长度必须大于6位!"));
      return;
    }

    callback();
  }

  // 验证确认密码
  function validateCheckPass(callback: Function): void {
    const { checkPass, password } = loginModel;
    if (!checkPass) {
      callback(new Error("两次密码不一致!"));
      return;
    }

    if (checkPass !== password) {
      callback(new Error("两次密码不一致!"));
      return;
    }

    callback();
  }


  async function login() {
    console.log(loginModel);
    let res: { success: boolean, result: any, message: string } = await loginApi(loginModel);
    console.log(res);
    if (res.success) {
      const result = res.result;
      user.value = { token: result.token, username: result.username };
      setToken(res.result.token);
      // Message.success("登录成功");
      return Promise.resolve(toResult(user));
    }

    return Promise.reject(res.message);
  }

  // 验证用户名
  function validateUsername(callback: Function): void {
    const { username } = loginModel;
    if (!username) {
      callback(new Error("用户名不能为空!"));
      return;
    }
    if (username.length < 2) {
      callback(new Error("用户名长度必须大于两位"));
      return;
    }
    callback();
  }

  return {
    login, loginModel, validatePass, validateUsername, logout, loggedIn, getCodeUrl, validateCheckPass
  };
};
