const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //引入html-webpack-plugin
module.exports = {
  plugins: [
    // 对应的插件
    new HtmlWebpackPlugin({
      //配置
      filename: "index.html", //输出文件名
      template: "./index.html" //以当前目录下的index.html文件为模板生成dist/index.html文件
    }),
    // 热更新，热更新不是刷新
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: [".js"],
    alias: {} //配置别名可以加快webpack查找模块的速度
  },
  module: {
    // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      }
    ]
  },
  devServer: {
    proxy: {
      "/guardian": {
        target: "http://192.168.0.73:8111",
        changeOrigin: true,
        pathRewrite: {
          "^/guardian": "/guardian"
        }
      },
      "/s": {
        target: "http://192.168.2.172:2222",
        changeOrigin: true,
        pathRewrite: {
          "^/s": "/s"
        }
      },
      "/mock": {
        target: "https://yapi.ihotel.cn",
        changeOrigin: true,
        pathRewrite: {
          "^/mock": "/mock"
        }
      }
    },
    contentBase: "./dist",
    //配置此静态文件服务器，可以用来预览打包后项目
    inline: true, //打包后加入一个websocket客户端
    hot: true, //热加载
    contentBase: path.resolve(__dirname, "dist"), //开发服务运行时的文件根目录
    compress: true //开发服务器是否启动gzip等压缩
  }
};
