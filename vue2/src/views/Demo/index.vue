<template>
  <div>
    <TestComponent :test="123" :text="'按鈕'" />
  </div>
</template>

<script setup lang="ts">
import Vue from "vue";

Array(1).fill(0).forEach(()=>{
  fetch("https://v2.api-m.com/api/chatgpt?msg=2023年最赚钱的行业", {
    method: "GET",
    redirect: "follow"
  })
    .then(response => response.text())
    .then(result => {
      console.log("result", result);
      console.log(result);
    })
    .catch(error => console.log("error", error));
})

const TestComponent = Vue.extend({
  name: "TestComponent",
  props: {
    text: {
      type: String,
      default: "text"
    },
    test: {
      type: Number,
      default: 123
    }
  },
  render() {
    return h("div", `${this.test}==${this.text}`);
  }
});

</script>
