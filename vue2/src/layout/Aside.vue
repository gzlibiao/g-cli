<template>
  <aside class="aside-wrap">
    <el-menu :collapse="isCollapse"
             :collapse-transition="false"
             router
             class="bo-menu"
             background-color="var(--bgColor)"
             text-color="var(--textColor)"
             active-background-color="var(--activeTextColor)"
             active-text-color="var(--activeBgColor)">
      <el-submenu
        popper-class="menu-popper" v-for="(menu,idx) in state.menuList" :index="menu.key" class="bo-menu__item">
        <template #title>
          <i class="el-icon-message"></i>
          <span class="bo-menu__item__text1">
            {{ menu.text }}
          </span>
        </template>

        <el-menu-item
          v-for="(subMenu) in menu.children"
          :index="subMenu.id"
        >{{ subMenu.text }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </aside>
</template>

<script setup lang="ts" name="Aside">
import { getMenuList } from "@/api/system/menu";
import { useTheme } from "@/store/theme";

const { isCollapse } = useTheme();

const state = ref({
  menuList: []
});

interface IMenu {
  text: string,
  path: string,
  icon: string,
  key: string,
  name: string,
  children?: IMenu[]
}

function buildMenu<T>(menuItem: any): IMenu {
  const children = menuItem.children?.map(buildMenu);
  return {
    text: menuItem.meta.title,
    path: menuItem.path,
    icon: menuItem.meta.icon,
    key: menuItem.id,
    name: menuItem.name,
    children
  };
}

async function listMenu() {
  const res = await getMenuList().catch(Message.error);
  if (res.success) {
    state.value.menuList = res.result.menu.map(buildMenu);
    console.log("menus", state.value.menuList, res);
  }
}

listMenu();
</script>

<style scoped lang="scss">
.aside-wrap {
  overflow: hidden auto;
}

::v-deep .menu-popper {
  background: #f00;
  color: blue;
}
</style>
