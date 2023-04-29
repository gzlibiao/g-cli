<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div ref="dom">
      <div ref="item" class="item">3</div>
      <div ref="item" class="item">2</div>
      <div ref="item" class="item">1</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useProps,type PropsType} from "../hooks/useProps";
import { useSortable } from "../hooks/useSortable.ts";
import {ref,unref,nextTick} from 'vue'
const dom=ref();
const item=ref();

async function init(){
  console.log((await import("sortablejs")).default,'default');


let {initSortable}= useSortable(()=>unref(dom),{
  handle: '.item',
  onEnd: (evt) => {
    const { oldIndex, newIndex } = evt;

    console.log(oldIndex, newIndex);
    // Sort column
    // const columns = tableColumns.value;
    // columns.splice(newIndex, 0, columns.splice(oldIndex, 1)[0]);
  },
});
initSortable();
}
init();
</script>

<style>
.item {
  cursor: pointer;
}
</style>
