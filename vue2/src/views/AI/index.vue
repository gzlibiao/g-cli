<script setup lang="ts">
import InputArea from "./components/InputArea.vue";
import MessageArea from "@/views/AI/components/MessageArea.vue";
import { chatAI } from "@/api/ai/ai";

interface IMessage {
  content: string,
  id: string,
  me: boolean
}

const messages = ref<IMessage[]>([]);

async function send(text: string) {
  messages.value.push({ id: GDK.core.guid(), me: true, content: text });
  const res = await chatAI(text).catch(Message.warn);
  console.log(res, "res");

  if (res.code === 200) {
    messages.value.push({ id: GDK.core.guid(), me: false, content: res.data });
    return;
  }
  messages.value.push({ id: GDK.core.guid(), me: false, content: "没有找到答案" });
}
</script>

<template>
  <div class="ai-area">
    <MessageArea :messages="messages">
      <template #append>
        <Lottie
          class="bo-mx-auto"
          :width="messages.length>0?'200px':'400px'"
          :height="messages.length>0?'200px':'400px'"
          src="https://assets6.lottiefiles.com/packages/lf20_ofa3xwo7.json"
        />
      </template>
    </MessageArea>

    <InputArea @query="send" class="bo-mt-auto input-area" />
  </div>

</template>

<style scoped lang="scss">
.ai-area {
  background-image: url("ai-bg.png");
  background-repeat: repeat;
  background-attachment: fixed;
  padding: 0;
  position: relative;
  display: flex;
  flex-flow: column nowrap;

  ::v-deep .message-area {
    flex: 1;
    overflow: auto;
    padding: 10px 10px;
  }

  .input-area {
    height: 40px;
    background-color: #fff;
    overflow: hidden;
    padding: 0 2px 4px 2px;
  }
}
</style>
