<template>
  <div id="app">
    <div id="nav">test</div>
  </div>
</template>
<script>
// import { post } from "axios";
import fly from "flyio";
// import req from "./request";
export default {
  async mounted() {
    window.console.log("1");
    fly.get("/guardian/s/weather?city=呼伦贝尔");
    // post("/guardian/s/weather?city=呼伦贝尔");
  }
};
</script>
