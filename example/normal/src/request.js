import Fly from "flyio";

/*import config from './config'*/
// const request = new Fly();
//request.config.timeout = 100000;
/*request.config.baseURL = 'apitest.ipms.cn'*/
Fly.interceptors.request.use(req => {
  window.console.log("2", "加载中...");
  // window.console.log(req);
  req.headers["csrfToken"] = "aa";
  return req;
});

Fly.interceptors.response.use(
  (response, promise) => {
    //console.log(response)
    window.console.log("response", response);
    return promise.resolve(response.data);
  },
  (err, promise) => {
    window.console.log("Err", err);
    window.console.log("closeLoading");
    return promise.resolve();
  }
);

// export default request;
