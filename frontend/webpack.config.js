var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context:__dirname,
    entry:"./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: "/"
    },
    mode: 'development',
    module: {
        rules: [
            {test: /\.(js|jsx)$/,exclude: /node_modules/, use: "babel-loader"},
            {test: /\.css$/, use: ["style-loader", "css-loader"]}
        ]
    }, plugins:[
        new HtmlWebpackPlugin({
            template: "public/index.html",
            filename: "index.html"
        })
    ],
    devServer: {
        historyApiFallback: true
    }
};