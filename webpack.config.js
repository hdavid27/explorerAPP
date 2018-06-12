const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

var DIST_DIR = path.resolve(__dirname, "/dist");
var SRC_DIR = path.resolve(__dirname, "/src");

var config = {

    entry:"./src/index.js",
    output: {
        path: DIST_DIR,
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
                
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            },
            { 
                test: /\.(jpe?g|png|gif|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                    
                ]
            }, 
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]

};

module.exports = config;