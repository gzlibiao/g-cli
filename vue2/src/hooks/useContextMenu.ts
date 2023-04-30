import { onUnmounted, getCurrentInstance } from "vue";
// // import type { ContextMenuItem } from "@/components/basic/context-menu";
// // import { createContextMenu, destroyContextMenu } from "@/components/basic/context-menu";
// export type { ContextMenuItem };

// export function useContextMenu(authRemove = true) {
//   if (getCurrentInstance() && authRemove) {
//     onUnmounted(() => {
//       destroyContextMenu();
//     });
//   }
//   return [createContextMenu, destroyContextMenu];
// }

export async function useEmit(emitName: string, emitValue: any) {
  const ctx = getCurrentInstance();
  console.log(ctx, emitName, "getInstall");

  const hooks = await ctx?.proxy.$emit(emitName, emitValue, () => console.warn);
  console.log(hooks, "hooks");
  return ctx?.proxy?.$emit;
}
