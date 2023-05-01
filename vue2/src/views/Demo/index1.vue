<template>
  <div>
    <TestComponent v-for="(d,idx) in dataList"
                   :key="d.id"
                   :text="d.text"
                   :id="d.id"
                   :onload="idx===dataList.length-1?show:null"
    />
    <!--    <div v-for="item in dataList">{{item}}</div>-->
  </div>
</template>

<script setup lang="ts">

const dataList = ref<any[]>([]);

function show() {
  console.log("show");
}

async function listData() {
  const result = Array(10000).fill({ text: "后端返回的数据" }).map((o, i) => (new Promise((resolve) => {
    // setTimeout(() => {
    resolve({ ...o, id: i + 1 });
    // }, 0);
  })));
  return await Promise.all(result);
}

// listData().then((res): void => {
//   // 5438.859130859375 ms
//   console.time("渲染耗时");
//   dataList.value = res as any[];
//   nextTick(() => {
//     console.timeEnd("渲染耗时");
//   });
// });

// if(false)
// 8237.2060546875
listData().then((res): void => {
  console.time("分片渲染耗时");
  const total = res.length;
  const page = 0;
  const limit = 100;
  const totalPage = Math.ceil(total / limit);
  const render = (page: number) => {
    if (page >= totalPage) {
      nextTick(() => {
        console.timeEnd("分片渲染耗时");
      });
      return;
    }
    requestAnimationFrame(() => {
      // console.log(dataList.value, page * limit, page * limit + limit, "limit");
      for (let i = page * limit; i < page * limit + limit; i++) {
        // dataList.value[i]=res[i];
        dataList.value.push(res[i]);
        // console.log(res[i]);
      }
      render(page + 1);
    });
    return;
  };
  render(page);
});

// Array(1).fill(0).forEach(()=>{
//   fetch("https://v2.api-m.com/api/chatgpt?msg=2023年最赚钱的行业", {
//     method: "GET",
//     redirect: "follow"
//   })
//     .then(response => response.text())
//     .then(result => {
//       console.log("result", result);
//       console.log(result);
//     })
//     .catch(error => console.log("error", error));
// })

const TestComponent = Vue.extend({
  name: "TestComponent",
  props: {
    text: {
      type: String,
      default: null
    },
    id: {
      type: Number,
      default: null
    }
  },
  render(props) {
    // console.log(this,props);
    return h("div", `${this.text}=>${this.id}`);
  }
});

</script>
