var path = require("path");
var webpack = require("webpack");
var htmlPlugin = require('html-webpack-plugin');
var cleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode : "development",
    entry:{
        app:path.resolve(__dirname,'src/index.js'),
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'./js/[name].bound.js'
    },
    module:{
       rules:[]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '127.0.0.1',
        port: 8080,
        open: true
    },
    plugins:[
        new cleanPlugin(['dist']),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            _: 'underscore',
            Backbone: 'backbone',
            echarts: 'echarts/lib/echarts'
        }),
        new htmlPlugin({
          template: './src/index.html',
          filename: 'index.html',
          hash: true,
          minify: {
            collapseWhitespace: false
          }
        })

    ]
}