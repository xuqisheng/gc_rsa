const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //引入html-webpack-plugin

let webpackConfig = {
  output: {
    filename: "main.js",
    path: __dirname + "/example/website/libs"
  },
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
  externals: {
    lodash: "lodash",
    flyio: "flyio"
  },
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
        target: "http://gw.ihotel.cn",
        changeOrigin: true,
        pathRewrite: {
          "^/guardian": "/guardian"
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

if (process.env.NODE_ENV == "analyz") {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = webpackConfig;
