/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

/* Fundamentals */


import webpack from 'webpack';

import WebpackConfig from 'webpack-config';

import cssnext from 'postcss-cssnext';

import postcssPartialImport from 'postcss-partial-import';

import ProgressBarPlugin from 'progress-bar-webpack-plugin';

import chalk from 'chalk';

import PATHS from '../../config/paths';


export default new WebpackConfig().merge({

  resolve: {

    extensions: ['.js', '.jsx'],
    modules: [
      PATHS.root,
      'node_modules',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.(woff|woff2|ttf|eot)$/i,
        loader: 'file-loader',
        query: {
          name: 'assets/fonts/[name].[ext]',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          {
            loader: 'file-loader',
            query: {
              name: 'assets/img/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  output: {
    path: PATHS.public,
    publicPath: '/public/',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js'

  },

  plugins: [
    // Progress bar + options
    new ProgressBarPlugin({
      format: ` ${chalk.magenta.bold('ReactQL')} building [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
    }),

    new webpack.LoaderOptionsPlugin({


      minimize: true,

      debug: true,
      options: {

        context: PATHS.src,

        postcss() {
          return {
            plugins: [
              postcssPartialImport({
                dirs: [
                  PATHS.src,
                ],
              }),
              cssnext(),
            ],
          };
        },

        imageWebpackLoader: {
          mozjpeg: {
            quality: 65,
          },
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
          svgo: {
            plugins: [
              {
                removeViewBox: false,
              },
              {
                removeEmptyAttrs: false,
              },
            ],
          },
        },
      },
    }),
  ],
});
