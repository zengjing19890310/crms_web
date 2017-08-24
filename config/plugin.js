const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const extractSASS = new ExtractTextPlugin({
    filename:'[name]/[name].css',
    allChunks:true
});
const componentsStyle = new ExtractTextPlugin({
    filename:"common/components.css",
    allChunks:false
});

module.exports = {
    init:function(srcPath){
        let plugins = [
            //删除dist使用文件操作
            // new CleanWebpackPlugin(['dist'],{//清除dist文件夹的内容
            //     "verbose": true,//将log写到 console
            //     "dry": false,//不要删除任何东西，主要用于测试.
            //     "exclude": []//排除不删除的目录，主要用于避免删除公用的文件
            // }),
            new webpack.DefinePlugin({//配置生产模式
                'ENV': JSON.stringify('prod')
            }),
            // componentsStyle,
            extractSASS,
            // new ExtractTextPlugin({//将每个入口文件引用的CSS文件单独提取出来
            //     filename: '[name]/[name].css',
            //     allChunks: true
            // }),
            // new webpack.BannerPlugin({
            //     banner: '这是通过webpack,向每一个经过打包的代码块顶部添加的一段注释'// 其值为字符串，将作为注释存在
            // }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['common'],
                filename: 'common/common.js',
                minChunks: 2 //当至少两个入口文件引用到同一个文件时,将其打包到common.js中
            }),
            new webpack.DefinePlugin({ //定义全局常量
                API: function (api) {
                    return '/crms_api/' + api;
                }
            }),
            new webpack.ProvidePlugin({//自动加载模块。 任何时候，当 identifier 被当作未赋值的变量时， module 就会自动被加载，并且 identifier 会被这个 module 输出的内容所赋值。
                Vue: 'vue/dist/vue.common.js',
                VueResource: 'vue-resource/dist/vue-resource.js',
                _: 'lodash',
                Vuex: 'vuex/dist/vuex.js',
                element: 'element-ui'
            }),

            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            })
            //压缩代码插件"生产模式使用",下面两种方式效果是基本一致的
            /*new webpack.optimize.UglifyJsPlugin({
             compress:{
             warnings:false,// warn about potentially dangerous optimizations/code
             sequences     : true,  // join consecutive statemets with the “comma operator”
             properties    : true,  // optimize property access: a["foo"] → a.foo
             dead_code     : true,  // discard unreachable code
             drop_debugger : true,  // discard “debugger” statements
             unsafe        : false, // some unsafe optimizations (see below)
             conditionals  : true,  // optimize if-s and conditional expressions
             comparisons   : true,  // optimize comparisons
             evaluate      : true,  // evaluate constant expressions
             booleans      : true,  // optimize boolean expressions
             loops         : true,  // optimize loops
             unused        : true,  // drop unused variables/functions
             hoist_funs    : true,  // hoist function declarations
             hoist_vars    : false, // hoist variable declarations
             if_return     : true,  // optimize if-s followed by return/continue
             join_vars     : true,  // join var declarations
             cascade       : true,  // try to cascade `right` into `left` in sequences
             side_effects  : true,  // drop side-effect-free statements
             global_defs   : {DEBUG: false}     // global definitions,定义类似全局变量
             }
             }),*/
            // new UglifyJSPlugin({//压缩代码插件"生产模式使用"
            //     compress:true,//是否压紧
            //     sourceMap:true,//调试映射到原模块
            // })
        ];
        let files = fs.readdirSync(path.resolve(srcPath));
        files.forEach(function (file, index) {
            // console.log(file);
            let chunks = [file,'common'];
            // if(file==='webSocketTest'){
            //     var chunks = [file,'socket','common'];
            // }
            plugins.push(new HtmlWebpackPlugin({//每打包一个HTML文件,需要一个插件指明响应的模版和输出文件名
                title: file,//名称,在页面中title内容为<title><%= htmlWebpackPlugin.options.title %></title>
                template: path.resolve(__dirname, '../src/pages', file, 'index.html'),
                filename: path.resolve(__dirname, '../dist', file, 'index.html'),
                //打包模块的顺序约定,默认是从后向前打包
                // chunksSortMode:function(){
                //     return 1;
                // },
                chunks: chunks//在打包HTML文件时,需要将本页面的JS和common文件打包到页面中
            }));
        });
        return plugins;
    }
};
