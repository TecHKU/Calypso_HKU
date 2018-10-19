const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
        }),
        new SWPrecacheWebpackPlugin({
            // By default, a cache-busting query parameter is appended to requests
            // used to populate the caches, to ensure the responses are fresh.
            // If a URL is already hashed by Webpack, then there is no concern
            // about it being stale, and the cache-busting can be skipped.
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            logger(message) {
              if (message.indexOf('Total precache size is') === 0) {
                // This message occurs for every build and is a bit too noisy.
                return;
              }
              console.log(message);
            },
            minify: true, // minify and uglify the script
            navigateFallback: '/index.html',
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),
        new ManifestPlugin({
            fileName: 'asset-manifest.json'
        }),
        new CopyWebpackPlugin([{
            from: 'src/pwa'
        }])
    ]
};