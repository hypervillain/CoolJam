import webpack from 'webpack';
import WebpackConfig from 'webpack-config';

import PATHS from '../../config/paths';
const path = require('path');
const CssChunkHashPlugin = require(path.join(process.cwd(), 'node_modules/css-chunks-html-webpack-plugin/lib/index'));

const HOST = 'localhost';
const LOCAL = `http://${HOST}:8080`;

const cssLoader = {
  loader: 'css-loader',
  query: {
    allChunks: true,
    modules: false,
    importLoaders: 1,
    sourceMap: false
  },
};

export default new WebpackConfig().extend({
  '[root]/browser.js': conf => {
    // `webpack-dev-server` polyfills
    conf.entry.browser.unshift(
      'react-hot-loader/patch',
      `webpack-dev-server/client?${LOCAL}`,
      'webpack/hot/only-dev-server',
    );

    conf.module.loaders.find(l => l.test.toString() === /\.jsx?$/.toString())
      .loaders.unshift({
        loader: 'react-hot-loader/webpack',
      });

    return conf;
  },
}).merge({

  devtool: 'source-map',

  devServer: {

    host: HOST,

    contentBase: PATHS.static,

    publicPath: '/',

    inline: true,

    hot: true,

    stats: false,

    historyApiFallback: {
      index: '/webpack.html',
    },
  },

  module: {
    noParse: [/moment.js/],
    loaders: [
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: { modules: false, allChunks: true, importLoaders: 1, localIdentName: "[path]___[name]__[local]___[hash:base64:5]" }
        }, {
          loader: "less-loader", options: {
            allChunks: true,
            modules: false,
            paths: [
              path.resolve(__dirname, "node_modules")
            ]
          }
        }]
      }
    ],
  },

  output: {
    sourceMapFilename: '[file].map',
    publicPath: `${LOCAL}/`,
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new CssChunkHashPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
});
