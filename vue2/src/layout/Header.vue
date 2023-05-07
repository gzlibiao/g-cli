<template>
  <header class="header">
    <span class="collapse-trigger" @click="toggleCollapse">
      <el-icon name="s-unfold" />
    </span>

    <div class="bo-ml-middle ">
      <el-input clearable @keydown.enter.native="search" class="bo-card hover bo-p-0 bo-px-mini" v-model.trim="searchModel">
        <template #prefix>
          <span @click="search" class="bo-d-flex bo-align-items-center bo-ml-mini bo-mr-middle bo-py-middle bo-h-stretch">
            <el-icon name="search" />
          </span>
        </template>
      </el-input>
    </div>

    <div class="bo-ml-auto"></div>
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

import { ThemeEnum, useTheme } from "@/store/theme";
import { useCounterStore } from "@/store/counter";

// STATE
const stateTheme = useTheme();
const { theme, isNight, toggleCollapse } = stateTheme;
const searchModel = ref("");

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
  stateTheme.TOGGLE_THEME();
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

function search(){
  console.log("search")
}
</script>

<style scoped lang="scss">
.header {
  //position: fixed;
}

.collapse-trigger {
  color: var(--light);
  font-size: 18px;
  border-radius: 50%;
  overflow: hidden;
  padding: 8px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;

  &:hover {
    background: var(--light);
    color: var(--dark)
  }
}
</style>
