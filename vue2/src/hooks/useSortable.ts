import { nextTick } from "vue";
import type { Options } from "sortablejs";

export function useSortable(getEl: () => HTMLElement, options?: Options) {
  function initSortable() {
    nextTick(async () => {
      const el = getEl();
      if (!el) {
        return;
      }
      const Sortable = (await import("sortablejs")).default;
      Sortable.create(el, {
        delayOnTouchOnly: true,
        group: "name", // or { name: "...", pull: [true, false, 'clone', array], put: [true, false, array] }
        sort: true, // boolean 定义是否列表单元是否可以在列表容器内进行拖拽排序
        delay: 400, // number 定义鼠标选中列表单元可以开始拖动的延迟时间；
        touchStartThreshold: 0, // px, how many pixels the point should move before cancelling a delayed drag event
        disabled: false, // boolean 定义是否此sortable对象是否可用，为true时sortable对象不能拖放排序等功能，为false时为可以进行排序，相当于一个开关；
        animation: 150, // ms, number 单位：ms，定义排序动画的时间
        easing: "cubic-bezier(1, 0, 0, 1)",
        handle: ".item", // 格式为简单css选择器的字符串，使列表单元中符合选择器的元素成为拖动的手柄，只有按住拖动手柄才能使列表单元进行拖动
        filter: ".ignore", // 过滤器，不需要进行拖动的元素
        preventOnFilter: true, //  在触发过滤器`filter`的时候调用`event.preventDefault()`
        draggable: ".item", // 允许拖拽的项目类名
        ghostClass: "sortable-ghost", // drop placeholder的css类名
        chosenClass: "sortable-chosen", // 被选中项的css 类名
        dragClass: "sortable-drag", // 正在被拖拽中的css类名
        ...options,
      });
    });
  }

  return { initSortable };
}
