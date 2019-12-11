import fly from "flyio";
import EngineWrapper from "flyio/dist/npm/engine-wrapper";
import _ from "lodash";
import signature from "./lib/signature";
import { uniAdapter, wxAdapter, jqueryAdapter, fetchAdapter } from "./adapter";

// 主函数
const rsa = (
  options = {
    appkey: "25396816",
    appsecret: "ba09305bef13bf8c17ace9987c66326f",
    engineType: "XMLHttpRequest", //底层请求库
    adapter: "fetch" //请求适配器
  }
) => {
  fly.engine = XMLHttpRequest;

  var engine = EngineWrapper((request, responseCallback) => {
    const req = signature(request, options);
    switch (options.adapter) {
      case "jquery":
        jqueryAdapter(req, responseCallback);
        break;
      case "wx":
        wxAdapter(req, responseCallback);
        break;
      case "uni":
        uniAdapter(req, responseCallback);
        break;
      default:
        fetchAdapter(req, responseCallback);
        break;
    }
  });
  //覆盖默认
  if (options.engineType === "fly") {
    fly.engine = engine;
  } else {
    XMLHttpRequest = engine;
  }
};
if (typeof window !== "undefined") {
  console.log("window");
  window.gc_rsa = rsa;
}
export default rsa;
