import Vue from "vue";
import App from "./App.vue";
import axios from "axios";

import gc_rsa from "../../../src/index";

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
gc_rsa({
  appkey: "25396816",
  appsecret: "ba09305bef13bf8c17ace9987c66326f",
  engineType: "fly"
});
import "./request";

// axios.interceptors.request.use(
//   config => {
//     config.headers["Authorization"] = "token-test";
//     return config;
//   },
//   err => {
//     return Promise.resolve(err);
//   }
// );

new Vue({
  render: h => h(App)
}).$mount("#app");
