import Vue from "vue";
import App from "./App.vue";
// import router from "./router";
// import pinia from "./store";

import('@/assets/styles/public.scss')

new Vue({
    // el:"#app",
    // router,
    // pinia,
    render: (h) => h(App)
}).$mount('#app')


// "vue-router": "^3.5.4",
//     "element-ui": "^2.15.13",
