module.exports = {
  devServer: {
    proxy: {
      "/guardian": {
        target: "http://gw.ihotel.cn",
        changeOrigin: true,
        pathRewrite: {
          "^/guardian": "/guardian"
        }
      }
    }
  }
};
