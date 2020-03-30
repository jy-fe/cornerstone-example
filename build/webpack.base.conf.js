"use strict";
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    app: "./src/main.js"
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    modules: [resolve("src"), resolve("node_modules")],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src"),
      assets: resolve("src/assets"),
      components: resolve("src/components"),
      cornerstone: "cornerstone-core",
      dicomParser: "dicom-parser",
      cornerstoneTools: resolve("static/dist/cornerstoneTools.js"),
      cornerstoneWADOImageLoader: resolve(
        "static/dist/cornerstoneWADOImageLoader.js"
      )
    }
  },
  plugins: [
    new ExtractTextPlugin("css/[name].[contenthash].css"),
    // 3. 配置全局使用 jquery
    new webpack.ProvidePlugin({
      cornerstone: "cornerstone-core",
      "window.cornerstone": "cornerstone-core",
      dicomParser: "dicom-parser",
      "window.dicomParser": "dicom-parser",
      cornerstoneTools: "cornerstoneTools",
      "window.cornerstoneTools": "cornerstoneTools",
      cornerstoneWADOImageLoader: "cornerstoneWADOImageLoader",
      "window.cornerstoneWADOImageLoader": "cornerstoneWADOImageLoader"
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          resolve("src"),
          resolve("test"),
          resolve("node_modules/webpack-dev-server/client")
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader" // compiles Less to CSS
          }
        ]
      },
      {
        test: /\.css$/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
