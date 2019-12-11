import Vue from "vue";
import App from "./App";

import pageHead from "./components/page-head.vue";
import pageFoot from "./components/page-foot.vue";
import uLink from "@/components/uLink.vue";
import store from "./store";
import gc_rsa from "../../../src/index";
import "./api/request";
gc_rsa({
  appkey: "25396816",
  appsecret: "ba09305bef13bf8c17ace9987c66326f",
  engineType: "fly",
  adapter: "uni"
});
// import "./api/request";
Vue.config.productionTip = false;

Vue.prototype.$store = store;
Vue.prototype.$backgroundAudioData = {
  playing: false,
  playTime: 0,
  formatedPlayTime: "00:00:00"
};

Vue.component("page-head", pageHead);
Vue.component("page-foot", pageFoot);
Vue.component("uLink", uLink);

App.mpType = "app";

const app = new Vue({
  store,
  ...App
});
app.$mount();
