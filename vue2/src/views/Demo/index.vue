<script setup lang="tsx" name="Demo">
// LIB
import { ThemeEnum, useTheme } from "@/store/modules/theme";
import { useRoute } from "../../../declare/auto-imports";

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

const container = ref();
import TestVue1 from "./TestVue.vue";
import TestClass1 from "./TestClass";
import Vue from "vue";

const TestVue = Vue.extend(TestVue1);
const TestClass = Vue.extend(TestClass1||{
  data() {
    return {
      text: 1
    };
  },
  render() {
    return h("div", "abc1");
  },
  mounted() {
    console.log("com");
    console.log("this.text");
  }
});
// const CV=new ComVue()
</script>

<template>
  <div class="container " :class="isNight?'theme-dark':'theme-light'">
    <aside class="aside">
      <el-menu class="bo-menu">
        <el-submenu index="1" class="bo-menu__item">
          <template #title>
            <i class="el-icon-message"></i>
            <span class="bo-menu__item__text">
              菜单1
            </span>
          </template>
        </el-submenu>
        <el-submenu index="2">
          <template #title><i class="el-icon-message"></i>
            <span class="bo-menu__item__text">菜单2</span></template>

          <el-submenu index="1-4">
            <template #title>选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </aside>

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
        <div ref="container">
          <TestVue />=>
          <TestClass />
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container {
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

  .aside {
    background: var(--bgColor);
    color: var(--textColor);
    flex-basis: 200px;

    .el-menu {
      color: var(--textColor);
      background-color: var(--bgColor);

      .el-menu-item {
        min-width: 40px;
        overflow: hidden;

        &:hover {
          background-color: var(--hoverBg);
        }
      }

      .el-submenu {
        &.is-active {
          .el-submenu__title {
            color: var(--textColor);
            background: var(--bgColor);

            i {
              color: var(--textColor);
            }
          }
        }

        ::v-deep .el-submenu__title {
          display: flex;
          align-items: center;
          color: var(--textColor);
          background: var(--bgColor);

          &:hover {
            background-color: var(--textColor);
            color: var(--bgColor);
          }
        }

        .el-submenu__icon-arrow {
          margin-top: -5px;
        }

        .el-menu-item {
          padding-left: 50px !important;

          &:hover {
            background-color: var(--hoverBg);
          }
        }
      }

    }
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
