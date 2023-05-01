declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "@vue/runtime-dom" {
  export * from "@vue/runtime-dom/dist/runtime-dom";
  export { defineComponent, PropType } from "vue";
}
