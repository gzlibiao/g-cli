<template>
  <div @click="trigger">SubComponent2</div>
</template>

<script lang="ts" setup>
import { $bus } from "@/hooks/useBus";
function trigger() {
  console.log("sub2 trig");
  $bus.$emit("trigger1");
}
</script>

<style lang="css" scoped></style>
