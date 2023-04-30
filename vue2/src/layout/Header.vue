<template>
    <header class="header">
        <el-header style="text-align: right; font-size: 12px">
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu #dropdown>
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>王小虎</span>
        </el-header>
    </header>
</template>

<script setup lang="ts" name="Header">
</script>

<style scoped lang="scss">
.header {
  //position: fixed;
}
</style>
