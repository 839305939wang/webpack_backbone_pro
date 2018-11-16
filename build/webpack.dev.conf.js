var path = require("path");
var webpack = require("webpack");
var merge = require("webpack-merge");
var htmlPlugin = require('html-webpack-plugin');
var cleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackBaseConfig = require("./webpack.base.conf");
var util = require("./util");
var entries = util.getEntry('src/pages/**/*.html');
for(var i in entries){
    entries[i]=path.resolve(__dirname,'../',entries[i])
}
var devConfig = function(){
    var config = {};
    var plugins = [
        new cleanPlugin(['dist']),
        new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                _: 'underscore',
                Backbone: 'backbone',
                echarts: 'echarts/lib/echarts'
        }),

    ]
    console.log("htmls:",entries)
    for(var name in entries){
        var template = entries[name]
        var html = new htmlPlugin({
            template: template,
            filename: path.resolve(__dirname,'../dist/html',name+".html"),
            hash: true,
            minify: {
                collapseWhitespace: false
            },
            inject: true,              // js插入位置
            chunksSortMode: 'dependency',
            chunks:['vendor',name]
        });
        plugins.push(html);
    }
    
    config.plugins = plugins;
    return config;
}
var webpackConfig = merge(webpackBaseConfig,devConfig());

module.exports = webpackConfig;