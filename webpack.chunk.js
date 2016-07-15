var path = require('path');
var webpack = require('webpack');




module.exports = {
    devtool: 'source-map',
    entry: {
            bundle:"./src/t/shardding/index.js"

        },
    output: {
        path: path.resolve(__dirname, 'shardding'),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {

        loaders: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'jsx-loader?harmony'
            },
            { test: /\.css$/, loader: "style!css" },
            {test:/\.json$/,loader:"json"},
            {
                test: /\.jsx?$/,
                loader:'babel',
                exclude:'/node_modules/',
                query: {
                    presets: ['es2015','react']
                }
            },
            {test: /\.png$/, loader: "url-loader?mimetype=image/png"},
            {test: /\.gif$/, loader: "url-loader?mimetype=image/gif"},
            {test: /\.jpg$/, loader: "url-loader?mimetype=image/jpeg"},
            {test: /\.svg$/, loader: "url-loader?mimetype=image/svg"}
        ]
    }
};