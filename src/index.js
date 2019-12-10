import fly from "flyio";
import EngineWrapper from "flyio/dist/npm/engine-wrapper";
import _ from "lodash";
import signature from "../lib/signature";
// import engineTypes from "../lib/engineTypes";
const next = (res, responseCallback) => {
  res
    .then(response => response.json())
    .then(res => {
      responseCallback(res);
    });
};
// 切换fly engine为真正的XMLHttpRequest
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
        next(jQuery(req.url, req), responseCallback);
        break;
      case "wx":
        wx.request({
          method: req.method,
          url: req.url,
          header: req.headers,
          dataType: req.dataType || "text",
          data: req.body || {},
          success(res) {
            responseCallback({
              statusCode: res.statusCode,
              responseText: res.data,
              headers: res.header,
              statusMessage: res.errMsg
            });
          },
          fail(res) {
            responseCallback({
              statusCode: res.statusCode || 0,
              statusMessage: res.errMsg
            });
          }
        });
        break;

      default:
        next(fetch(req.url, req), responseCallback);
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
