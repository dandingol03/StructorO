var path = require('path');
var webpack = require('webpack');




module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.resolve(__dirname,
            'src/t/dragging/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'src/t/dragging'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer:{
        contentBase: "./src/t/dragging",
        colors: true,
        historyApiFallback: true,
        inline: true,
        port:3000,
        hot:true,
        proxy:{
            '/serviceHall/*.do':{
                target: 'http://localhost:8090/',
                secure: false
            }
        }
    },
    plugins: [
        // Webpack 1.0
        new webpack.optimize.OccurenceOrderPlugin(),
        // Webpack 2.0 fixed this mispelling
        // new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
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