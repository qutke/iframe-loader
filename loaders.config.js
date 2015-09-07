/*
 *  Module
 *  http://webpack.github.io/docs/configuration.html#module
 *  loaders | preLoaders | postLoaders | noParse
 *  unknownContextRegExp | unknownContextCritical | exprContextRegExp | exprContextCritical | wrappedContextCritical
 *
 *  Loaders: 指定匹配的文件类型所需要使用的Loader
 *    js | jsx                             ==> react-hot && babel
 *    css                                  ==> style
 *    less                                 ==> less
 *    styl                                  ==> Stylus
 *    text | data                       ==> raw
 *    wofff/woff2/ttf/eot/svg   ==> 其他资源文件的Loader
 */
module.exports = [
  {
    test: /\.(js|jsx)$/,
    loaders: ['react-hot', 'babel'],
    exclude: /node_modules/,
    include: __dirname
  }, {
    test: /\.css?$/,
    loaders: ['style', 'raw'],
    include: __dirname
  }, {
    test: /\.less?$/,
    loader: 'style!css!less',
    exclude: /node_modules/,
    include: __dirname
  }, {
    test: /\.styl$/,
    loader: 'style-loader!css-loader!stylus-loader',
    exclude: /node_modules/,
    include: __dirname
  }, {
    test: /\.(txt|data)$/,
    loaders: ['raw'],
    exclude: /node_modules/,
    include: __dirname
  }, {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff'
  }, {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff'
  }, {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/octet-stream'
  }, {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file'
  }, {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=image/svg+xml'
  }
]
