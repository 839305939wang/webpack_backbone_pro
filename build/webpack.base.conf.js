var path = require("path");
var util = require("./util");
var entries = util.getEntry('src/assets/js/pages/**/*.js');
for(var i in entries){
    entries[i]=path.resolve(__dirname,'../',entries[i])
}
module.exports = {
    mode : "development",
    entry:entries,
    output:{
        path:path.resolve(__dirname,'../dist/js'),//path.resolve("../",__dirname,'dist'),
        filename:'./js/[name].js'
    },
    module:{
       rules:[{
           test:/.html$/,
           use:{
               loader:'html-loader'
           }
       }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: '127.0.0.1',
        port: 8080,
        open: true,
        hot:true,
    },
    optimization: {
        //拆分公共包
        splitChunks: {
          cacheGroups: {
            // 第三方组件
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
    
              chunks: "initial",
              name: "vendors",
              enforce: true
            }
          }
        }
    },
    resolve: {
        // 免后缀
        extensions: ['.js', '.html', '.json'],
        // 别名
        alias: {}
    }
}