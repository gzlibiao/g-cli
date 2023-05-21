<template>
  <div @click="click">
    <slot name="Header" />
    123
  </div>
</template>
<script setup lang="ts">
function click(){
  console.log("click");
}
</script>
<style lang="scss" scoped name="Index1">
</style>
