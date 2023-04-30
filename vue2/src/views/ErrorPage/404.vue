<template functional>
    <div class="error">
        <div class="inBox">
            <div>404</div>
            <p>雾霾太大，连页面都看不见了！</p>
            <router-link to="/" >
                <el-button  type="primary" size="medium">回到首页</el-button>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts" name="UnknownPage">
// LIB
// STATE

// FUNCTION

// EVENT
</script>

<style scoped lang="scss">
.error {
    background-color: #fff;
    height: 100vh;
    .inBox {
        width: 100%;
        height: 100%;
        background-image: url("https://jf-temp-1301446188.cos.ap-guangzhou.myqcloud.com/R09TUw==/eyJpZCI6ImRlMTAxOTA1LTBkOWMtNGJlZC1hMTEyLTQxZmIyNGQ3NzkyMCIsIm5hbWUiOiI0MDQucG5nIiwiZGlyIjoi5byA5Y+R5Zu+54mHIn0=");
        background-repeat: no-repeat;
        background-size: 100%;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        div{
            color: var(--color-primary);
            font-size: 50px;
        }
        p{
            font-size: 20px;
        }
    }
}
</style>
