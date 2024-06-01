const path = require('path');
const baseConfig = require('./webpack.config.cjs');
const { default: merge } = require('webpack-merge');

const dist = path.resolve(__dirname, 'dist');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: dist,
  },
});
