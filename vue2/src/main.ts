import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import "virtual:svg-icons-register";
import("@/assets/styles/public.scss");
import("@/assets/theme/style/theme/index.scss");
Vue.directive("dragSortable", {

  async inserted(el, bind) {

    console.log(bind,el,'target', bind.value.getTarget?.())
    const target = bind.value.getTarget?.() || el;
    const sortableCallback = bind.value.sortableCallback;
    let group = bind.value.group;
    const ignore = bind.value.ignore;
    const dragClass = bind.value.dragedClass || "dragged";
    const trigger = bind.value.trigger;
    const uniqueKey = bind.value.uniqueKey;
    const sort = !!bind.modifiers.sort;
    const isClone = bind.modifiers.clone;

    if (group && isClone) {
      group = {
        name: group,
        pull: "clone"
      };
    }
    const Sortable = (await import("sortablejs")).default;
    const sortable=Sortable.create(el, {
      group,
      animation: 100,
      delay: 10,
      filter: ignore,
      sort,
      dataIdAttr:uniqueKey,
      fallbackOnBody: true,
      forceFallback: false,  // 忽略 HTML5拖拽行为，强制回调进行
      handle: trigger, // 只有按住拖动手柄才能使列表单元进行拖动
      ghostClass: dragClass, // drop placeholder的css类名
      chosenClass: dragClass, // 被选中项的css 类名
      dragClass: dragClass, // 正在被拖拽中的css类名
      // 结束拖拽
      onEnd: (evt): void => {
        const oldIndex: number = evt.oldIndex as number;
        const newIndex: number = evt.newIndex as number;
        console.log(evt);
        sortableCallback?.({
          from:Object.values(evt.from)[0] as InstanceType<typeof Sortable>,
          to:Object.values(evt.to)[0] as InstanceType<typeof Sortable>,
          oldIndex,
          newIndex,
          destory:()=>sortable.destroy()
        });
      }
    });
  },

  // 最后卸载时，清除事件绑定
  unbind(el, bind) {
    console.log("uninstall");


  }
});

new Vue({
  el: "#app",
  router,
  pinia,
  render: (h) => h(App)
});


