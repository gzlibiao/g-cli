<script setup lang="ts" name="Demo">
// LIB
import Aside from "./Aside.vue";
import { ThemeEnum, useTheme } from "@/store/modules/theme";

// STATE
const stateThme = useTheme();
// console.log(stateThme.$state.theme, "sts");

const isNight = computed(() => {
  return stateThme.$state.theme === ThemeEnum.Dark;
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
  // console.log("toggleNight", isNight);
  stateThme.SET_THEME(isNight.value ? ThemeEnum.Light : ThemeEnum.Dark);
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

<template>
  <div class="layout " :class="isNight?'theme-dark':'theme-light'">
    <Aside />

    <main class="main">
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


      <div class="body">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(40px, 200px) minmax(400px, 1fr);

  &.theme-dark {
    --bgColor: var(--dark);
    --textColor: var(--light);
  }

  &.theme-light {
    --bgColor: var(--light);
    --textColor: var(--dark);
  }

  .main {
    flex: 1 1 auto;
    display: flex;
    flex-flow: column nowrap;

    .header {
      background: var(--bgColor);
      color: var(--textColor);
      flex-basis: 50px;
      text-align: right;

      display: flex;
      justify-content: flex-end;
      align-items: center;

      .header-nav__item {
        cursor: pointer;

        &.account {
          text-align: center;
          font-size: 12px;
          font-weight: 300;
        }
      }
    }

    .body {
      flex: 1;
      overflow: auto;
      display: flex;
    }
  }
}
</style>
