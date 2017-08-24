const path = require('path');
const fs = require('fs');
module.exports = {
    init : function (srcPath) {//入口配置
        let entry = {

        };
        // let statics = fs.readdirSync(path.resolve(srcPath, '../static'));
        // //打包公有静态资源
        // if (statics && statics.length !==0)　{
        //     statics.forEach(function(file,index){
        //         entry[file] = path.resolve(srcPath,'../static', file);
        //     });
        // }
        //同步读取
        let files = fs.readdirSync(path.resolve(srcPath));
        if (files && files.length !== 0) {
            files.forEach(function (file, index) {
                entry[file] = path.resolve(srcPath, file, 'index.js');
            })
        }
        return entry;
    }
};