<template>
  <div >
    <el-collapse ref="$collapse" v-drag-sortable.sort="{getTarget,uniqueKey:'data-id',sortableCallback,trigger:'.item'}" @change="handleChange">
      <div class="item" v-for="item in collapses" :key="item">
        <el-collapse-item  :name="item">
          <template slot="title">
            <div :data-id="item">
              {{now()}}{{item}}<i class="header-icon el-icon-info"></i>
            </div>
          </template>

          <template #default>
            <template v-if="isActive(item)">
              <transition name="el-zoom-in-top">
                <div  v-show="isActive(item)&&activeNames.includes(item)">
                  <p v-for="item in data" :key="item.uid">{{item}}
                    <el-calendar>
                    </el-calendar>
                  </p>
                </div>
              </transition>
            </template>
          </template>
        </el-collapse-item>
<!--        {{item}}-->
      </div>
    </el-collapse>
  </div>

<!--  <div>-->
<!--    {{ model.map(o => o.data) }}-->
<!--    <ul v-drag-sortable.sort="{group:'test',sortableCallback,trigger:'.item',uniqueKey}">-->
<!--      <li v-for="item in model" :class="{'item':item.data!==1}" :key="`li_${item.id}`">-->

<!--        <ul style="margin-left:50px;border:1px solid blue;" v-if="item.data===3"-->
<!--            v-drag-sortable.clone.sort="{group:'test'}">-->
<!--          <li v-for="subItem in 10" :class="{'ignore':subItem===1}" :key="`li_${subItem}${item.id}`">-->
<!--            {{ subItem }}-->
<!--          </li>-->
<!--        </ul>-->

<!--        <template v-else>-->
<!--          {{ item.data }}-->
<!--        </template>-->
<!--      </li>-->
<!--    </ul>-->

<!--  </div>-->
</template>

<script setup lang="ts" name="Collapse">
const $collapse=ref();
function getTarget(){
  return $collapse.value.$el;
}
const data = ref(Array(30).fill({
  name: "测试",
  age: "18",
  msg: "我是老六老六的六六六",
  bota: "cpdd"
}).map((o, i) => ({ ...o, name: o.name + i, uid: Math.random().toString(18).substring(2, 18) })));
const collapses = ref(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]);

function now() {
  return Date.now();
}

const model = ref(Array(10).fill(0).map((o, i) => ({ id: Math.random().toString(16).substring(2, 16), data: i + 1 })));

const unBindTask = new Set<() => void>();
const uniqueKey=Symbol('test123');

function sortableCallback({ oldIndex, newIndex, destory,to,from }: {
  oldIndex: number,
  newIndex: number,
  destory: () => void
  to:any,
  from:any,
}) {
  unBindTask.add(destory);
  console.warn("end")
  // console.log(newIndex,oldIndex, "model",to,from,to.options.dataIdAttr,from.options.dataIdAttr,to.options.dataIdAttr===from.options.dataIdAttr);
if(true)
  return;
  if(newIndex<model.value.length&&oldIndex<model.value.length){
    if(to.options.dataIdAttr!==from.options.dataIdAttr){
      // 删除
      model.value.splice(oldIndex,1);
    }else{
      [model.value[newIndex], [model.value[oldIndex]]] = [model.value[oldIndex], [model.value[newIndex]]];
    }
    nextTick(()=>{
      model.value = model.value.map(o => ({ ...o }));
    })
  }
}

onBeforeUnmount(() => {
  unBindTask.forEach(o => {
    o();
  });
});
const activeSet = ref(new Set());
const activeNames = ref<string[]>([]);

const handleChange = (val: string[]) => {
  val.forEach(v => activeSet.value.add(v));

  nextTick(() => {
    activeNames.value = val;
  });
};

function clear() {
  activeSet.value.clear();
}

function isActive(title: string) {
  return activeSet.value.has(title);
}
</script>

<style scoped lang="scss">
.dragged {
  background: red;
}

li {
  border: 1px solid pink;

  &:not(.ignore) {
    cursor: pointer;
  }
}

.item{
  width: 100vw;
  background: red;
}
</style>
