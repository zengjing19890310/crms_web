const path = require('path');
module.exports = {
    init:function(){
        return {
            filename: '[name]/[name].js',
            path: path.resolve(__dirname, '../dist/'),
            chunkFilename: 'common/common.js',
            pathinfo: false,
            publicPath: '../'//发布的URL地址,对项目迁移和图片处理,提供便利
        };
    }
};
