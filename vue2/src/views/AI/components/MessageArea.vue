<script setup lang="ts">
import type {  IMessage } from "@/types/chatTypes";
const props = defineProps<{
  messages: IMessage[]
}>();

import { useScroll } from "@/views/AI/hooks/useScroll";

const $message = ref();

const { scrollToDown } = useScroll(() => $message.value, props.messages);

watch(() => props.messages, () => {
  scrollToDown();
}, {
  deep: true,
  immediate: true
});
</script>

<template>
  <div class="message-area" ref="$message">
    <div class="assistant-message" v-for="msg in messages" :key="msg.id">
      <div class="bo-flex-shrink-0" v-if="!msg.me">
        <div class="bo-card bo-p-mini ">
          <el-avatar>AI</el-avatar>
        </div>
      </div>
      <div class="bo-card bo-mx-large bo-p-small bo-shrink-1" :class="msg.me?'bo-ml-auto':''">
        <strong class="message-text">
          {{ msg.content }}
        </strong>
      </div>
      <div class="bo-flex-shrink-0" v-if="msg.me">
        <div class="bo-card bo-p-mini ">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
      </div>
    </div>

    <slot name="append" />
  </div>
</template>

<style scoped lang="scss">

.assistant-message {
  display: flex;
  margin-top: 20px;
  align-content: center;
  justify-content: start;
  flex-direction: row;
}

.message-text {
  line-height: 1.25rem;
  word-wrap: break-word;
  flex: 1 1 auto;
  font-size: 0.875rem;
  letter-spacing: 0.0178571429em;
  text-transform: none;
}
</style>
