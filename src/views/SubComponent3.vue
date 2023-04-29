<template>
  <div>
    <button @click="testChildren">btn</button>
  </div>
</template>

<script>
export default {
  methods: {
    async testChildren() {
      console.log("testChildren");

      const emitValue = await this.$emit("test", "testValue", (call) => {
        console.warn(call);
      });
      console.log(emitValue, "emitValue");
    },
  },
};
</script>
