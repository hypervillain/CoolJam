/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// This config generates a production-grade browser bundle.  It minifies and
// optimises all Javascript source code, and extracts and processes CSS before
// dumping it in a finished `styles.css` file in the `dist` folder

// ----------------------
// IMPORTS

import webpack from 'webpack';
import WebpackConfig from 'webpack-config';
const path = require('path')
const glob = require('glob')

import PATHS from '../../config/paths'

import ExtractTextPlugin from 'extract-text-webpack-plugin';
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssChunkHashPlugin = require(path.join(process.cwd(), 'node_modules/css-chunks-html-webpack-plugin/lib/index'));

// TO-DO
//const PurgecssPlugin = require('purgecss-webpack-plugin')

const CleanWebpackPlugin = require('clean-webpack-plugin')

import CompressionPlugin from 'compression-webpack-plugin';



const extractCSS = new ExtractTextPlugin({
  filename: '[name].css',
  disable: false,
  allChunks: true,
  publicPath: 'public/assets/css'
});

const extractLESS = new ExtractTextPlugin({
  filename: "[name].css",
  disable: false,
  allChunks: true,
  publicPath: 'public/assets/css'
});

const cssLoader = {
  loader: 'css-loader',
  query: {
    allChunks: false,
    modules: false,
    importLoaders: 1,
    sourceMap: false
  },
};

export default new WebpackConfig().extend({
  '[root]/browser.js': config => {
    config.module.loaders.find(l => l.test.toString() === /\.(jpe?g|png|gif|svg)$/i.toString())
      .loaders.push({
        loader: 'image-webpack-loader',
        options: {},
      });

    return config;
  },
}).merge({
  output: {
    //path: process.cwd() + '/dist',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    noParse: [/moment.js/],
    loaders: [
      {
        test: /\.less$/,
        loader: ExtractCssChunks.extract({
          fallbackLoader: 'style-loader',
          loader: [
            { loader: 'css-loader', options: { modules: false, allChunks: true, importLoaders: 1, localIdentName: "[path]___[name]__[local]___[hash:base64:5]" }},
            { loader: 'less-loader', options: { modules: false, allChunks: true}},
          ]
        })
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: ExtractCssChunks.extract({
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            },
          }
        })
      },
    ],
  },


  plugins: [

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new CleanWebpackPlugin(['dist/public'], { root: process.cwd()}),

    // Breaks in Chrome < 45
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "commons",
    //   filename: "commons.js",
    // }),

    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr/),

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.optimize.UglifyJsPlugin(),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.AggressiveMergingPlugin(),

    new CompressionPlugin({
      minRatio: 0.8,
    }),

    new ExtractCssChunks(),
    new CssChunkHashPlugin({ inject: true }),

    new HtmlWebpackPlugin({filename: process.cwd().concat('/dist/index.html'), template: process.cwd().concat('/kit/views/index.html')}),

    new webpack.HashedModuleIdsPlugin()
  ],
});
