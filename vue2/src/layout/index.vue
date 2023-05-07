<script setup lang="ts" name="Demo">
// LIB
import Aside from "./Aside";
import Header from "./Header";
import { useTheme } from "@/store/theme";

// STATE
const { isNight } = useTheme();

// FUNCTION
</script>

<template>
  <div class="layout" :class="isNight?'theme-dark':'theme-light'">
    <Aside class="aside" />

    <main class="main">
      <Header class="app" />

      <div class="body">
        <router-view class="container" />
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
  grid-template-columns: auto minmax(400px, 1fr);

  &.theme-dark {
    --bgColor: var(--dark);
    --textColor: #000;
    --activeTextColor: #000;
    --activeBgColor: #000;
  }

  &.theme-light {
    --bgColor: var(--light);
    --textColor: #000;
    --activeTextColor: #000;
    --activeBgColor: #000;
  }

  .aside {
    width: auto;
  }

  .main {
    flex: 1 1 auto;
    display: flex;
    flex-flow: column nowrap;

    .header {
      background: var(--bgColor);
      color: var(--textColor);

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

      flex-basis: 50px;
    }

    .body {
      overflow: auto;
      flex-basis: calc(100vh - 50px);

      .container {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
