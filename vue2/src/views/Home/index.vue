<template>
  <div class="container">
    <div class="top">
      <div class="bo-card hover">
        测试1
      </div>

      <div class="bo-card hover">
        测试1
      </div>

      <div class="bo-card hover">
        测试1
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
// LIB
import { STORE_TOKEN_KEY } from "@/utils/core";
// STATE
console.log(STORE_TOKEN_KEY, "STORE_TOKEN_KEY");

// FUNCTION

// EVENT
</script>

<style scoped lang="scss">
.container {
  background: #bbb;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.top {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
</style>
