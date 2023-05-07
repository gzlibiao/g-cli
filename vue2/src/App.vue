<template>
  <router-view v-if="isRouterAlive" />
</template>
<script setup lang="ts" name="App">
const isRouterAlive = ref(true);

provide("reload", () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
});
</script>
<style scoped lang="scss">

</style>
