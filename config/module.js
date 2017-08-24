const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    init:function(){
        return {
            rules: [
                {
                    test: /\.json$/,
                    use: 'json-loader'
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: "css-loader",//?minimize启用压缩和混合
                        fallback: "style-loader"
                    }),
                    // include: path.resolve(__dirname, '../src'),
                    // exclude: path.resolve(__dirname, '../src/components')
                },
                {
                    test: /\.scss$/,
                    use:ExtractTextPlugin.extract({
                        //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                        use:['css-loader','sass-loader'],
                        fallback: 'style-loader'
                    }),
                    // include: path.resolve(__dirname, '../src'),
                    // exclude: path.resolve(__dirname, '../src/components')
                },
                {
                    test: /\.js$/,
                    use: {
                        //babel-loader开启缓存编译结果选项
                        loader: 'babel-loader?cacheDirectory'
                    },
                    include: path.resolve(__dirname, '../src')
                },
                //处理图片的Loader
                {
                    test: /\.(png|jpg|gif|ico)$/,
                    use: {
                        loader: 'url-loader?limit=256&name=common/images/[name].[ext]'
                    },
                    include: path.resolve(__dirname, '../src')
                },
                //处理字体文件的Loader
                {
                    test: /\.(woff|woff2|svg|eot|ttf)$/,
                    use: {
                        loader: 'file-loader?&name=common/fonts/[name][hash].[ext]'
                    }
                },
                //处理自定义vue组件
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax', // <style lang="sass">
                            css: ExtractTextPlugin.extract({
                                use: 'css-loader',
                                fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                            })
                        },
                        extractCSS: true
                    },
                    include: path.resolve(__dirname, '../src/components')
                }
            ]
        }
    }
};
