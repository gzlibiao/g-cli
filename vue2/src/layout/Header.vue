<template>
  <header class="header">
    <svg-icon class="bo-mr-small header-nav__item" @click="toggleNight" height="20px" width="20px"
              :icon="isNight?'moon':'sun'" />
    <el-dropdown class="bo-mr-small header-nav__item" @command="item=>item.callback()">
      <i class="el-icon-setting" />
      <el-dropdown-menu slot-name="dropdown">
        <el-dropdown-item v-for="item in settings" :command="item" :key="item.eventName">
          {{ item.text }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <span class="bo-mr-small header-nav__item account">王小虎</span>
  </header>
</template>

<script setup lang="ts" name="Header">

import { ThemeEnum, useTheme } from "@/store/modules/theme";

// STATE
const stateTheme = useTheme();

const isNight = computed(() => {
  return stateTheme.$state.theme === ThemeEnum.Dark;
});

interface ISetting {
  text: string,
  eventName: string,
  callback: () => void
}

const settings = computed<ISetting[]>(() => [{
  text: "个人中心",
  eventName: "center",
  callback: center
}, {
  text: "系统设置",
  eventName: "setting",
  callback: setting
}, {
  text: "退出",
  eventName: "logout",
  callback: logout
}]);

// FUNCTION
function toggleNight() {
  stateTheme.SET_THEME(isNight.value ? ThemeEnum.Light : ThemeEnum.Dark);
}

function center() {
  console.log("center");
}

function logout() {
  console.log("logout");
}

function setting() {
  console.log("setting");
}
</script>

<style scoped lang="scss">
.header {
  //position: fixed;
}
</style>
