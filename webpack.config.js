const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const outputDirectory = "dist";

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    "file-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
};