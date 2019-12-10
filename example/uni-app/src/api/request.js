var Fly = require("flyio");

/*import config from './config'*/
// const request = new Fly();
//request.config.timeout = 100000;
/*request.config.baseURL = 'apitest.ipms.cn'*/
Fly.interceptors.request.use(req => {
  console.log("2", "加载中...");
  // window.console.log(req);
  req.headers["csrfToken"] = "aa";
  return req;
});

Fly.interceptors.response.use(
  (response, promise) => {
    //console.log(response)
    console.log("closeLoading");
    return promise.resolve(response.data);
  },
  (err, promise) => {
    console.log("closeLoading");
    return promise.resolve();
  }
);

// export default request;
