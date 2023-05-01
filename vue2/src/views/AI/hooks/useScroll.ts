export function useScroll<T>(getDom: () => HTMLElement, data: T) {
  const scrollToDown = () => {
    const dom = getDom();
    nextTick(() => {
      dom.scrollTop = dom.scrollHeight;
    });
  };
  const scrollToUp = () => {
  };

  const state = {
    oldScrollTop: 0,
    isScrollUp: true,
    Intervall: null
  };

  onMounted(() => {
    const dom = getDom();

    function scrolling() {
      let scrollTop = dom.scrollTop;
      // 更新——滚动前，滚动条距文档顶部的距离
      let scrollStep = scrollTop - state.oldScrollTop;
      state.oldScrollTop = scrollTop;
      //判断当前是向上or向下滚动
      if (scrollStep < 0) {
        state.isScrollUp = true;
      } else {
        state.isScrollUp = false;
      }
    }

    //监听滚动事件
    dom.addEventListener("scroll", scrolling);


    onUnmounted(() => {
      // 销毁监听滚动事件
      dom.removeEventListener("scroll", scrolling);
    });
  });

  return { scrollToDown, state, scrollToUp };
}
