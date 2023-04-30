// import router from './router';
// import type { Menu } from '@/apis/user';
// import { treeDataForEach } from '@/utils/treeData';

// 引入 views 文件夹下所有 vue 文件，用户根据用户菜单权限构建动态路由
const modules = import.meta.glob('@/views/**/*.vue');

// 根据当前用户菜单创建动态路由
// menuTreeData: Menu[]
export const initDynamicRouter = async () => {
    // treeDataForEach(menuTreeData, menu => {
    //     const routeConfig = {
    //         path: menu.path,
    //         name: menu.name,
    //         meta: menu.meta,
    //     };
    //     if (menu.meta?.accessible === false) {
    //         router.addRoute('layout', {
    //             ...routeConfig,
    //             component: modules['/src/views/errorPage/401.vue'],
    //         });
    //     } else {
    //         router.addRoute('layout', {
    //             ...routeConfig,
    //             component:
    //                 modules[menu.componentPath as string] ||
    //                 modules['/src/views/errorPage/404.vue'],
    //         });
    //     }
    // });
};
