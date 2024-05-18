const path = require('path');

const paths = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'tests/dist'),
};

const LIB_NAME = 'icon_wallet_sdk';

module.exports = {
  mode: 'development',
  entry: path.resolve(paths.src, 'main.ts'),
  devtool: 'inline-source-map',
  output: {
    filename: `${LIB_NAME}.bundle.js`,
    path: path.resolve(paths.dist),
    library: LIB_NAME,
    libraryTarget: 'umd',
    // umdNamedDefine: true,
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: { '@': paths.src },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
};
