<template>
    <div class="container">
        <!--        <aside class="aside">-->
        <!--            <el-menu :default-openeds="['1', '3']">-->
        <!--                <el-submenu index="1">-->
        <!--                    <template #title><i class="el-icon-message"></i>导航一</template>-->
        <!--                    <el-menu-item-group>-->
        <!--                        <template #title>分组一</template>-->
        <!--                        <el-menu-item index="1-1">选项1</el-menu-item>-->
        <!--                    </el-menu-item-group>-->
        <!--                    <el-submenu index="1-4">-->
        <!--                        <template #title>选项4</template>-->
        <!--                        <el-menu-item index="1-4-1">选项4-1</el-menu-item>-->
        <!--                    </el-submenu>-->
        <!--                </el-submenu>-->
        <!--            </el-menu>-->
        <!--        </aside>-->

        <!--        <main class="main">-->
        <!--            <header class="header">-->
        <!--                <svg-icon :iconClass="true?'moon':'sun'" />-->
        <!--                <el-dropdown>-->
        <!--                    <i class="el-icon-setting" style="margin-right: 15px"></i>-->
        <!--                    <el-dropdown-menu slot="dropdown">-->
        <!--                        <el-dropdown-item>查看</el-dropdown-item>-->
        <!--                        <el-dropdown-item>新增</el-dropdown-item>-->
        <!--                        <el-dropdown-item>删除</el-dropdown-item>-->
        <!--                    </el-dropdown-menu>-->
        <!--                </el-dropdown>-->
        <!--                <span>王小虎</span>-->
        <!--            </header>-->


        <!--            <div class="body">-->
        <!--                <div style="width: 100%;height: 100%" class="position-relative">-->
        <!--&lt;!&ndash;                    <el-table :data="tableData">&ndash;&gt;-->
        <!--&lt;!&ndash;                        <el-table-column prop="date" label="日期" width="140">&ndash;&gt;-->
        <!--&lt;!&ndash;                        </el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;                        <el-table-column prop="name" label="姓名" width="120">&ndash;&gt;-->
        <!--&lt;!&ndash;                        </el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;                        <el-table-column prop="address" label="地址">&ndash;&gt;-->
        <!--&lt;!&ndash;                        </el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;                    </el-table>&ndash;&gt;-->
        <!--                    asdgsd-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </main>-->
        agsdg
    </div>
</template>

<style>
.container {
    height: 100%;
    width: 100%;
    display: flex;
    overflow: hidden;
    /*grid-template-columns: 4fr 10fr;*/

    .aside {
        flex-basis: 200px;
    }

    .main {
        flex: 1 1 auto;
        /*flex-grow:1;*/
        /*flex-shrink: 1;*/
        /*flex-basis: auto;*/
        display: flex;
        flex-flow: column nowrap;

        .header {
            flex-basis: 80px;
            background: var(--light);
            text-align: right;
        }

        .body {
            flex: 1;
            overflow: auto;
            display: flex;
        }
    }
}
</style>

<script setup lang="ts">
const item = {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
};
const tableData = ref(Array(20).fill(item))
</script>
