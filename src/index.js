import fly from "flyio";
import EngineWrapper from "flyio/dist/npm/engine-wrapper";
import _ from "lodash";
import signature from "./lib/signature";
import adapter from "./adapter";

// 主函数
const rsa = (
  options = {
    appkey: "25396816",
    appsecret: "ba09305bef13bf8c17ace9987c66326f",
    engineType: "fly", //底层请求库
    adapter: "fetch" //请求适配器
  }
) => {
  fly.engine = XMLHttpRequest;

  var engine = EngineWrapper((request, responseCallback) => {
    try {
      let flag = false;

      if (options.exclude) {
        for (let index = 0; index < options.exclude.length; index++) {
          const element = options.exclude[index];
          if (request.url.indexOf(element) > -1) {
            flag = true;
          }
        }
      }
      const ad = `${options.adapter ? options.adapter : "fetch"}Adapter`;
      adapter[ad](
        flag || request.headers.noSign ? request : signature(request, options),
        responseCallback
      );
    } catch (error) {
      console.warn(error);
    }
  });
  //覆盖默认
  if (options.engineType == "fly") {
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
