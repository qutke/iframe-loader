var path = require('path')
var webpack = require('webpack')

var DEBUG = process.env.NODE_ENV !== 'release'

var devtool, entry, plugins, output

if (DEBUG) {
  devtool = 'source-map'
  entry = [
    // 在页面中自动增加http://localhost:3000/webpack-dev-server.js，可以检测目前webpack的运行情况
    'webpack-dev-server/client?http://localhost:3000',
    // 其做用是当源码发生修改以后可以live reloads
    'webpack/hot/only-dev-server',
    './index.js'
  ]
  plugins = [new webpack.HotModuleReplacementPlugin()]
  output = {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  }
} else {
  devtool = false
  entry = ['./index.js']
  plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      async: true

    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ]
  output = {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  }
}

module.exports = {
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: devtool,
  entry: entry,
  output: output,
  stats: {
    colors: true,
    reason: false
  },
  /*
   *  Plugins
   *  https://github.com/webpack/docs/wiki/list-of-plugins
   *  HotModuleReplacementPlugin: 用于支持模块热更新的插件
   *  NoErrorsPlugin: 保证程序不会在编译产生错误的时候终止
   */
  plugins: plugins,
  /*
   *  Resolve
   *  http://webpack.github.io/docs/configuration.html#resolve
   *  提供了包括 alias | root | modulesDirectories | fallback | extensions | packageMains | packageAlias | unsafeCache等的配置项
   */
  resolve: {
    // alias: {
    //   'react': path.join(__dirname, 'node_modules', 'react')
    // },
    extensions: ['', '.js', '.jsx']
  },
  // 简单来说，指定loader的解析模式和目录。
  resolveLoader: {
    'fallback': path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: require('./loaders.config')
  }
}
