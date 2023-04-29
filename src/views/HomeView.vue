<template>
  <div v-show="visible">
    <p>合同预览</p>
    <SubComponent1 v-if="visible1" />
    <SubComponent2 />
    <SubComponent3 @test="parentTest" />
  </div>
</template>
  
<script setup lang="ts" name="ContractPreview">
import { ref, onMounted } from "vue";
import { $bus, useBus, IEvent } from "@/hooks/useBus";
import PDFJS from "pdfjs-dist";
import pdfjsLib from "pdfjs-dist";
import SubComponent1 from "./SubComponent1.vue";
import SubComponent2 from "./SubComponent2.vue";
import SubComponent3 from "./SubComponent3.vue";
// console.log("mark", markRaw(SubComponent1));
function parentTest(value, value2) {
  console.log("parentTest", value);
  // return new Promise((resolve) => {
  //   resolve("parentTest");
  // });
  value2("callbackValue");
}

const events: IEvent[] = [
  {
    name: "trigger",
    event: (value) => {
      console.log("trigger", value);
      visible1.value = false;
    },
  },
  {
    name: "trigger1",
    event: (value) => {
      visible1.value = true;
      console.log("trigger", value);
    },
  },
];
const a = useBus(events);

const visible = ref(true);
const visible1 = ref(true);
const title = ref("查看协议");
const pdfDoc = ref(null);
const pages = ref(0);
</script>

<style scoped>
canvas {
    display: block;
    border-bottom: 1px solid black;
}
</style>
