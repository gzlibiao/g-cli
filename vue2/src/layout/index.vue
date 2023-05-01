<script setup lang="ts" name="Demo">
// LIB
import Aside from "./Aside";
import Header from "./Header";

import { ThemeEnum, useTheme } from "@/store/modules/theme";

// STATE
const stateTheme = useTheme();

const isNight = computed(() => {
  return stateTheme.$state.theme === ThemeEnum.Dark;
});


// FUNCTION

</script>

<template>
  <div class="layout " :class="isNight?'theme-dark':'theme-light'">
    <Aside />

    <main class="main">
      <Header />

      <router-view class="body" />
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
