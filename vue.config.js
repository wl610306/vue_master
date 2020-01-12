module.exports = {
  publicPath: '/', // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  outputDir: 'dist', // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: 'public', //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: 'index.html', //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  pages: {
    //pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: {
      //除了 entry 之外都是可选的
      entry: 'src/main.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
      template: 'public/index.html', // 模板来源
      filename: 'index.html', // 在 dist/index.html 的输出
      title: 'Index Page', // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
    }
  },
  chainWebpack: config => {
    // // 修复HMR开启热更新
    // config.resolve.symlinks(true)
    //关闭警告  禁用fork-ts-checker
    config.plugins.delete("fork-ts-checker") 
    // //关闭热重载
    // config.module
    // .rule('vue')
    // .use('vue-loader')
    // .loader('vue-loader')
    // .tap(options => {
    //     options.hotReload = false;
    //     return options
    // })
    // config.module
    //   .rule('images')
    //   .use('url-loader')
    //   .tap(options => {
    //     merge(options, {
    //       limit: 5120,
    //     })
    //   })
    // config.module
    //   .rule('css')
    //     .test(/\.css$/)
    //     .oneOf('vue')
    //     .resourceQuery(/\?vue/)
    //     .use('px2rem')
    //       .loader('px2rem-loader')
    //       .options({
    //         remUnit: 75, //转换比例
    //         remPrecision: 2 // rem的小数点后位数
    //       })
  },

  // 除了上述使用 chainWebpack 来改变 webpack 内部配置外，我们还可以使用 configureWebpack 来进行修改，
  // 两者的不同点在于 chainWebpack 是链式修改，而 configureWebpack 更倾向于整体替换和修改。示例代码如下：
  // configureWebpack 可以直接是一个对象，也可以是一个函数
  // configureWebpack: config =&gt; {
  //     // config.plugins = []; // 这样会直接将 plugins 置空
  //     // 使用 return 一个对象会通过 webpack-merge 进行合并，plugins 不会置空
  //     return {
  //         plugins: []
  //     }
  // },
  lintOnSave: true, // 是否在保存的时候检查
  productionSourceMap: true, // 生产环境是否生成 sourceMap 文件
  css: {
    extract: process.env.NODE_ENV === 'development' ? false : true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps
    loaderOptions: { // css预设器配置项
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            autoprefixer: true, //添加浏览器前缀
            rootValue: 32, // 换算的基数 设计稿750宽度的1/10
            // selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
            selectorBlackList: ['.css'], // 过滤掉.css开头的class，不进行rem转换
            propList: ['*'] // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
          }),
        ]
      }
    },
    requireModuleExtension: true // 启用 CSS modules for all css / pre-processor files.
  },
  //反向代理
  devServer: {
    // 环境配置
    // host: 'localhost', // 指定使用一个 host。默认是 localhost
    // 整个页面刷新
    // liveReload: false,
    // port: 8080, // 端口地址
    // https: false, // 使用https提供服务
    // 热重载 
    // hotOnly: true,
    // hot: false,
    // inline: true,
    open: true, //配置自动启动浏览器
    proxy: {
      // 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
      '/api': {
        target: 'http://192.168.1.248:9888',
        // target: 'http://192.168.1.4:8999',
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  pluginOptions: {
    // 第三方插件配置
    // ...
  }
}





















// // vue.config.js 配置说明
// //官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// // 这里只列一部分，具体配置参考文档
// const path = require('path')
// const resolve = dir => path.resolve(__dirname, dir)
// module.exports = {
//     // 部署生产环境和开发环境下的URL。
//     // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
//     //例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 baseUrl 为 /my-app/。
//         //baseUrl 从 Vue CLI 3.3 起已弃用，请使用publicPath
//       //baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",

//     publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
//      //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
//      filenameHashing: true,
//     // outputDir: 在npm run build 或 yarn build 时 ，生成文件的目录名称
//     outputDir: "mycli3",

//     //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
//     assetsDir: "assets",
//     //指定生成的 index.html 的输出路径  (打包之后，改变系统默认的index.html的文件名)
//     indexPath: "myIndex.html",

//     //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
//     lintOnSave: true,
//     //如果你想要在生产构建时禁用 eslint-loader，你可以用如下配置
//     // lintOnSave: process.env.NODE_ENV !== 'production',

//     //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。(默认false)
//     // runtimeCompiler: false,

//     /**
//      * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
//      *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
//      *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
//      *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
//      * */
//     productionSourceMap: false,

//     // 它支持webPack-dev-server的所有选项
//     devServer: {
//       host: "localhost",
//       port: 1111, // 端口号
//       https: false, // https:{type:Boolean}
//       open: false, //配置自动启动浏览器
//       // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
//       // 配置多个代理
//       proxy: {
//         "/api": {
//           target: "<url>",// 要访问的接口域名
//           ws: true,// 是否启用websockets
//           changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
//           pathRewrite: {
//               '^/api': '' //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
//             }
//         },
//         "/foo": {
//           target: "<other_url>"
//         }
//       }
//     }
//   };