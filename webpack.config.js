//src/web
const agrv = require('yargs-parser')(process.argv.slice(2))
const _mode = agrv.mode || "development" //从命令行获取当前环境的值envcorss也可以做到
const _mergeConfig = require(`./config/webpack.${_mode}.js`) //引入当前环境的webpack单独配置
const merge = require('webpack-merge') //merge连接数组并合并创建新对象的对象的函数
const glob = require('glob'); //使用shell使用的模式匹配文件如 *等
const files = glob.sync('./src/web/views/**/*.entry.js'); //获取匹配到的入口文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  join,
  resolve
} = require('path')
const ConsoleLogOnBuildWebpackPlugin = require('./config/htmlAfterPligin')
let _plugins = [];
let _entry = {};

console.log(files, /.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js)$/g.test(files[0]) == true)

for (let item of files) {
  if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js)$/g.test(item) === true) {
    const entryKey = RegExp.$1; //第一组
    console.log(entryKey, item, 'xxxxxxxxx')
    let [dist, template] = entryKey.split('-');
    _plugins.push(
      new HtmlWebpackPlugin({
        filename: `../views/${dist}/pages/${template}.html`,
        chunks: ['runtime', entryKey],
        template: `src/web/views/${dist}/pages/${template}.html`,
        inject: false
      })
    );
    _entry[entryKey] = item;
  }
}

console.log('用户参数', _mode)
const webpackConfig = {
  entry: _entry,
  output: {
    path: join(__dirname, './dist/assets'),
    filename: 'scripts/[name].bundle.js'
  },
  plugins: [
    ..._plugins,
    new ConsoleLogOnBuildWebpackPlugin(),

  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  },
  resolve: {
    alias: {
      '@': resolve('src/web/components')
    }
  },
}

module.exports = merge(webpackConfig, _mergeConfig)





// const path = require('path')
// const ExtractTextPlugin = require("extract-text-webpack-plugin")

// function resolve(dir) {
//   return path.resolve(__dirname, dir)
// }
// module.exports = {
//   entry: './app.js',
//   output: {
//     filename: 'yd-[hash:5].js',
//     path: __dirname + '/dist'
//   },
// //   resolve: {
// //     extensions: ['.js', 'json'],
// //     alias: {
// //       '@': resolve('src')
// //     }
// //   },
//   module: {
//     // rules: [
//     //     {
//     //     test: /\.js$/,
//     //     loader: 'babel-loader',
//     //     include: [resolve('src/web')]
//     //   },
//     //   {
//     //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
//     //     loader: 'url-loader',
//     //     option: {
//     //       limit: 10000,
//     //       name: __dirname + 'src/web/images/[name]-[hash:7].[ext]'
//     //     }
//     //   },
//     //   {
//     //     test: /\.css$/,
//     //     use: ExtractTextPlugin.extract({
//     //         fallback: "style-loader",
//     //         use: "css-loader"
//     //       })
//     //   },
//     // ]

//   },
//   plugins: [
//     //   new HtmlWebpackPlugin(),
//     //   new ExtractTextPlugin("[name].css")
//   ]


// }
