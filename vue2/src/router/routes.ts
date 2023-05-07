import { ROUTE_MAP, isLayoutPage } from "./constant";

const modules = import.meta.glob("@/views/**/index.vue", { eager: true });

console.log(modules, "views");
const routesConfig = Object.values(modules).map(({ default: module }: any) => {
  return {
    name: module.name,
    path: `${isLayoutPage(module.name) ? "" : "/"}${module.name}`,
    component: module,
    isLayoutPage: isLayoutPage(module.name),
    ...ROUTE_MAP[module.name]
  };
});

console.log(routesConfig, "routes");

export const routes = routesConfig.filter(r => !r.isLayoutPage);
export const layoutRoutes = routesConfig.filter(r => r.isLayoutPage);
