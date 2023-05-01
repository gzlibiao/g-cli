<template>
  <aside class="aside">
    <el-menu class="bo-menu">
      <el-submenu v-for="(menu,idx) in state.menuList" :index="menu.key" class="bo-menu__item">
        <template #title>
          <i class="el-icon-message"></i>
          <span class="bo-menu__item__text">
            {{ menu.text }}
          </span>
        </template>

        <el-menu-item
          v-for="(subMenu, subIdx) in menu.children"
          :index="subMenu.id"
        >{{ subMenu.text }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </aside>

</template>

<script setup lang="ts" name="Aside">
import { getMenuList } from "@/api/menu";

const state = reactive({
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
  const res = await getMenuList();
  if (res.success) {
    state.menuList = res.result.menu.map(buildMenu);
    console.log("menus", state.menuList, res);

    // res.result.menu.reduce((pre, cur) => {
    //   const menuItem = buildMenu(cur);
    //   if (cur.children?.length > 0) {
    //     menuItem.group = true;
    //     Object.assign(menuItem, {
    //       children: cur?.children.map(buildMenu)
    //     });
    //   }
    //   pre.push(menuItem);
    //
    //   return pre;
    // }, []);
  }
}

listMenu();
</script>

<style scoped lang="scss">
.aside {
  overflow: auto;
  background: var(--bgColor);
  color: var(--textColor);
  flex-basis: 200px;

  .el-menu {
    color: var(--textColor);
    background-color: var(--bgColor);

    .el-menu-item {
      min-width: 40px;
      overflow: hidden;

      &:hover {
        background-color: var(--hoverBg);
      }
    }

    .el-submenu {
      &.is-active {
        .el-submenu__title {
          color: var(--textColor);
          background: var(--bgColor);

          i {
            color: var(--textColor);
          }
        }
      }

      ::v-deep .el-submenu__title {
        display: flex;
        align-items: center;
        color: var(--textColor);
        background: var(--bgColor);

        &:hover {
          background-color: var(--textColor);
          color: var(--bgColor);
        }
      }

      .el-submenu__icon-arrow {
        margin-top: -5px;
      }

      .el-menu-item {
        padding-left: 50px !important;

        &:hover {
          background-color: var(--hoverBg);
        }
      }
    }
  }
}
</style>
