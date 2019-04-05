const webpack = require('webpack')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// // const extractPlugin = new ExtractTextPlugin({
// //   filename: '[name].css',
// //   allChunks: true,
// // })

const path = require('path')
const dist = path.resolve(__dirname, 'public')

module.exports = {
  plugins: [
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    // }),
  ],
  mode: 'development',
  entry: {
    js: './index.js',
  },
  output: {
    path: dist,
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          {
            loader: 'file-loader',
            options: { name: './css/' + '[name].css' },
          },
          // 'raw-loader',
          'extract-loader',
          // 'to-string-loader',
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html',
            },
          },
          'extract-loader',
          // 'apply-loader',
          // 'pug-loader',
          'html-loader',
          'pug-html-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: function(rpath) {
                const file = path.parse(rpath)
                const rel = path.relative(path.resolve(__dirname,'src/img'), file.dir)
                return path.join('img', rel, file.base)
              },
              // outputPath: path.resolve(__dirname, 'public', 'img')
            },
          },
        ],
      },
    ],
  },
}
