<template>
  <div class="container">
    <button @click="add()">add</button>
    <div class="layout">
      <div class="left">left</div>
      <div class="right" :style="{maxHeight:autoMax}" id="right">right</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Demo">
const autoMax=ref('0');
const topContainer=ref<HTMLElement>();
function add() {
  autoMax.value = "0px";
  const right = document.getElementById("right") as HTMLElement;
  Array(10).fill(0).forEach(() => {
    const dom = document.createElement("div");
    dom.innerHTML = "<div>test</div>";
    right.append(dom);
  });
  autoMax.value = "99999px";
}
</script>

<style scoped>
.layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: auto;
    height: auto;
    border: 1px solid pink
}

.left {
    height: auto;
    background-color: red;
}

.right {
    background-color: blue;
    transition: max-height 3s ease-in-out;
    max-height: 0;
}
</style>
