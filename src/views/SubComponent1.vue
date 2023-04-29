<template>
  <div @click="trigger">SubComponent1</div>
</template>

<script lang="ts" setup>
import { useBus, IEvent } from "@/hooks/useBus";
const events: IEvent[] = [
  {
    name: "trig",
    event: () => {
      console.log("sub1");
    },
  },
];
const { $bus } = useBus(events);
function trigger() {
  console.log("sub1 trig");
  $bus.$emit("trigger");
}
</script>

<style lang="css" scoped></style>
