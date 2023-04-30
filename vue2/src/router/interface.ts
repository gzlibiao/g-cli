export const ROUTE_NAME_MAP = {
    LAYOUT: "layout",
    HOME: "home",
    ABOUT: "about",
} as const;

export const routes = [
    {
        path: "/",
        // redirect: "/home/index"
        redirect: "/demo"
    },
    {
        path: "/404",
        component: () => import("@/views/ErrorPage/404.vue")
    },
    {
        path: "/demo",
        component: () => import("@/views/Demo/index.vue")
    },
    {
        path: "/login",
        component: () => import("@/views/Account/Login/index.vue")
    },
    {
        path: "/home",
        redirect: "/home/index",
        name: ROUTE_NAME_MAP.LAYOUT,
        component: () => import("@/layout/index.vue"),
        meta: {
            title: '首页',
            icon: 'el-icon-s-home'
        },
        children: [{
            path: 'index',
            name: ROUTE_NAME_MAP.HOME,
            component: () => import('../views/Home/index.vue'),
            meta: {
                title: '首页'
            }
        }]
    },
];
