var path = require('path');
var fs = require('fs');

var os = require('os');

var netAddress = os.networkInterfaces();
var localAddress = netAddress.WLAN;
var ipv4Address = null;
//解析本地ipv4地址,用于设置PUBLICPATH
if(localAddress&&localAddress.length!==0){
    localAddress.forEach(function(obj,index){
        if(obj.family === 'IPv4'){
            ipv4Address = obj.address;
        }
    });
}
// console.log(ipv4Address);

var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');//清除目标文件夹内容的插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var UglifyJSPlugin = require('uglifyjs-webpack-plugin');//压缩代码使用
var srcPath = path.resolve(__dirname, 'src/pages');

//生产环境
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');//压缩代码使用

//开发环境
const devServer = null;//开发用热替换服务器

//获取入口配置
const entryConfig = require(path.resolve(__dirname,'config/entry.js')).init(srcPath);
//获取出口配置
const outputConfig = require(path.resolve(__dirname,'config/output.js')).init();
//获取插件配置
const pluginConfig = require(path.resolve(__dirname,'config/plugin.js')).init(srcPath);
//获取模块配置
const moduleConfig = require(path.resolve(__dirname,'config/module.js')).init();

module.exports = {
    // devtool:'cheap-module-source-map',
    context: path.resolve(__dirname, "webPackTemp"),
    entry: entryConfig,
    output: outputConfig,
    resolve: {
        //默认 NPM 包导出的是 运行时 构建。为了使用独立构建，在 webpack 配置中添加下面的别名:
        modules: [path.resolve(__dirname, 'node_modules')]
    },
    module: moduleConfig,
    plugins: pluginConfig,
    // watch:true,
    // watchOptions:{
    //     ignored: '/node_modules/',//不监听的文件夹
    //     poll:1000//轮询时间
    // },
    // externals:{ //防止将某些 import 包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展包(external package)。
    //     // $:'jquery',
    // },
    // devServer:{
    //     contentBase: path.join(__dirname, "dist/main"),
    //     compress: true,
    //     port:5566,
    //     clientLogLevel: "none",//当使用内联模式(inline mode)时，在开发工具(DevTools)的控制台(console)将显示消息
    //     headers:{
    //         token:'this is a token'
    //     },
    //     lazy: true,//惰性加载
    //     filename:'config.js',
    //     historyApiFallback: true,//任意的 404 响应可以提供为 index.html 页面
    //     hot: true,
    //     proxy: { //如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。
    //         "/api": "http://localhost:3000"
    //     },
    //     publicPath: "http://localhost:5566/dist/main"
    // },
};