<template>
  <Lottie
    class="error"
    width="100%"
    height="100%"
    :src="url"
    @click="router.push('/')"
  >
  </Lottie>
</template>

<script setup lang="ts" name="NotFound">
// LIB
import {useRouter} from "@/hooks/useContext";
// STATE

const router=useRouter();
const url=ref('https://assets9.lottiefiles.com/packages/lf20_suhe7qtm.json')

// FUNCTION
// EVENT
</script>

<style scoped lang="scss">
.error {
  background-color: #fff;
  cursor: pointer;
}
</style>
