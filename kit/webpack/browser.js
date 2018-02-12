/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import path from 'path';

import webpack from 'webpack';

import WebpackConfig from 'webpack-config';

import CopyWebpackPlugin from 'copy-webpack-plugin';

import PATHS from '../../config/paths';

export default new WebpackConfig().extend('[root]/base.js').merge({

  entry: {
    browser: [
      path.join(PATHS.entry, 'browser.js'),
    ],
  },

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  module: {


    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'babel-loader',
            query: {
              // Ignore .babelrc,
              // used to compile WebPack plugin
              babelrc: true,
              presets: ['es2015', 'react', 'stage-1',
                ['env', {
                  loose: true,
                  modules: false,
                  targets: {
                    browsers: [">1%"]
                  },
                  useBuiltIns: true,
                }],
                'react',
              ]
              ,
              "plugins": [
                ["transform-runtime", {
                  "polyfill": true,
                  "loose": true,
                  "modules": false,
                  "regenerator": true
                }],
                "dual-import", "syntax-dynamic-import",
                ["import", { "libraryName": "antd", "style": true }],
                "transform-object-rest-spread",
              ],
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => (
         module.context && module.context.indexOf('node_modules') !== -1
      ),
    }),

    new webpack.DefinePlugin({
      SERVER: false,
    }),
  ],
});
