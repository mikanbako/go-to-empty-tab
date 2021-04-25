const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const WebExtPlugin = require('web-ext-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    browserAction: {
      import: './src/browserAction/script.ts',
      filename: 'browserAction/script.js',
    },
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'extension-dist'),
  },
  plugins: [
    new CopyPlugin(
      {
        patterns: [
          {
            from: './src/manifest.json',
            to: path.resolve(__dirname, 'extension-dist')
          },
          {
            from: './src/browserAction/*.html',
            to: path.resolve(__dirname, 'extension-dist/browserAction/[name][ext]')
          },
          {
            from: './src/browserAction/*.css',
            to: path.resolve(__dirname, 'extension-dist/browserAction/[name][ext]')
          },
          {
            from: './src/icons',
            to: path.resolve(__dirname, 'extension-dist/icons')
          },
        ]
      }
    ),
    new WebExtPlugin(
      { sourceDir: path.resolve(__dirname, 'extension-dist') }),
    new ESLintPlugin({ extensions: 'ts' }),
  ],
};
