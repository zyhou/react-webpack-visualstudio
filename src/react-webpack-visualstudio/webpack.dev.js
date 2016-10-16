var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

console.log("---------- USING DEVELOPMENT ----------");

module.exports = {

    debug: true,
    //watch: true,

    entry: {
        javascript: './reactApp/index.js'
    },

    output: {
        path: "./wwwroot/",
        filename: 'dist/bundle.js',
        publicPath: "/"
    },

    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html']
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        outputPath: path.join(__dirname, 'wwwroot/')
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"]
                }
            },

            // copy those assets to output
            {
                test: /\.(png|jpg|gif|ico|woff|woff2|ttf|svg|eot)$/,
                exclude: /node_modules/,
                loader: "file?name=assets/[name]-[hash:6].[ext]",
            },

            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: "style-loader!css-loader"
            },

            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },

            {
                test: /\.html$/,
                loader: "raw"
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(
            [
                './wwwroot/dist',
                './wwwroot/fonts',
                './wwwroot/assets'
            ]
        ),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'reactApp/index.html'
        }),

        new CopyWebpackPlugin([
            { from: './reactApp/images/*.*', to: "assets/", flatten: true }
        ])
    ]
};
