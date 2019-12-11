export default (req, responseCallback) => {
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
};
