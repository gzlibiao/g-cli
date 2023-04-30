<template>
  <div>
    <el-form
      ref="refForm"
      :model="loginModel"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginModel.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginModel.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="loginModel.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <div class="">
          <el-input v-model="loginModel.captcha" autocomplete="off" />
          <img :src="codeUrl" @click="rdCode" height="50" width="50" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm"> 提 交</el-button>
        <el-button @click="refForm?.resetFields()"> 重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { useUser } from "./hooks/useAccount";

const refForm = ref();

const codeUrl = ref("");
const {
  loginModel,
  login,
  validateUsername,
  validatePass,
  validateCheckPass,
  getCodeUrl
} = useUser();

async function rdCode() {
  const res = await getCodeUrl();
  if (res.success) {
    codeUrl.value = res.result;
  }
}

rdCode();


const rules = reactive({
  username: [
    {
      validator: (rule: {}, value: string, call: Function): void =>
        validateUsername(call),
      trigger: "blur"
    }
  ],
  password: [
    {
      validator: (rule: {}, value: string, call: Function): void => validatePass(call),
      trigger: "blur"
    }
  ],
  checkPass: [
    {
      validator: (rule: {}, value: string, call: Function): void =>
        validateCheckPass(call),
      trigger: "blur"
    }
  ],
  captcha: [
    {
      required: true,
      message: "验证码不能为空",
      trigger: "blur"
    }
  ]
});

const submitForm = async () => {
  console.log(refForm, "refForm", refForm.value);
  const validRes = await refForm.value.validate().catch(console.warn);
  if (!validRes) {
    return;
  }
  console.log(validRes, "res2");
  const result = await login().catch(() => Message.error(""));
  // if (result) {
  //   location.href = "/";
  // }
  if (result) {
    Message.success("登录成功");
  }
  console.log(result, "result");
};

</script>

<style lang="scss" scoped></style>
