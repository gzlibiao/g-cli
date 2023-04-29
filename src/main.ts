import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
Vue.use(PiniaVuePlugin);

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount("#app");

//  url:
//         "https://jf-temp-1301446188.cos.ap-guangzhou.myqcloud.com/R09TUw%3D%3D/eyJpZCI6ImZiYjdmZGE3LTViMjUtNGEwMS04MjNhLWI0MTRjMzE3NjcxMiIsIm5hbWUiOiLpobnnm67mkK3lu7ror7TmmI4ucGRmIiwiZGlyIjoiIn0%3D?q-sign-algorithm=sha1&q-ak=AKIDTtxvjHvYTO2SdjfBUYMtgDbooXzpQhic&q-sign-time=1681652535;1681653435&q-key-time=1681652535;1681653435&q-header-list=host&q-url-param-list=&q-signature=11f4c04fe8a62baf1fa75019991197e3d00bc498", // pdf文件地址
