<template>
    <div class="layout">
        <Header/>

        <main class="main">
            <Aside/>
            <router-view/>
        </main>
    </div>
</template>

<script setup lang="ts" name="Layout">
// LIB

import Header from '@/layout/Header.vue'
import Aside from '@/layout/Aside.vue'



// STATE

// FUNCTION

// EVENT
</script>

<style scoped lang="scss">
.main {
    display: grid;
    grid-template-columns: 4fr 10fr;
}
</style>
