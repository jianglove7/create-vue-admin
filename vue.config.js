const CompressionPlugin = require('compression-webpack-plugin'); // gzip
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 分析打包体积
const path = require('path');
const IS_PROD = process.env.NODE_ENV === 'production';
const cdnDomian = '/';

const resolve = dir => path.join(__dirname, dir);
console.log(process.env.BASE_URL);
module.exports = {
  publicPath: IS_PROD ? cdnDomian : '/',
  assetsDir: 'static',
  // 代理相关
  devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    // open: false, // 是否打开浏览器
    // host: "localhost",
    // port: "8080", // 代理断就
    // https: false,
    // hotOnly: false, // 热更新
    // proxy: {
    //   '/api': {
    //     target: process.env.BASE_URL, // 目标代理接口地址
    //     secure: false,
    //     changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
    //     // ws: true, // 是否启用websockets
    //     pathRewrite: {
    //       '^/api': '/'
    //     }
    //   }
    // },
    proxy: {
      '/api': {
        target: process.env.BASE_URL, // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },

  css: {
    loaderOptions: {
      sass: {
        data: `@import '~styles/var.scss';
        @import '~styles/mixin.scss';`
      }
    }
  },

  // 修改 webpack 配置
  // 其他插件可以 webpack-merge 合并的配置对象
  configureWebpack: (config) => ({

    devtool: 'source-map',
    resolve: {
      alias: {
        '~styles': path.resolve('./src/assets/styles'),
        '~images': path.resolve('./src/assets/images'),
      }
    }
  }),

  // 通过 webpack-chain 修改 webpack 配置
  chainWebpack: config => {
    // #region svg-config
    const rule = config.module.rule('svg');
    rule.exclude.add(path.resolve('./src/assets/icons/svg'));
    const svgRule = config.module.rule('auto-svg'); // 找到svg-loader
    svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule
      .test(/\.(svg)(\?.*)?$/)
      .exclude
      .add(/node_modules/) // 正则匹配排除node_modules目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });
    // #endregion svg-config
    if (process.env.NODE_ENV === 'production') {
      // #region 图片压缩
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .exclude
        .add(path.resolve('src/assets/icons/svg'))
        .end()
        .use('img-loader')
        .loader('img-loader').options({
          plugins: [
            require('imagemin-jpegtran')(),
            require('imagemin-pngquant')({
              quality: [0.75, 0.85]
            })
          ]
        });
        
      // #endregion
      // #region 启用GZip压缩
      config
        .plugin('compression')
        .use(CompressionPlugin, {
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          cache: true
        })
        .tap(args => {});

      // #endregion

      // #region 忽略生成环境打包的文件

      var externals = {
        vue: 'Vue',
        axios: 'axios',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        // '@tweenjs/tween.js': 'TWEEN'
      };
      config.externals(externals);
      const cdn = {
        css: [
          // element-ui css
          '//unpkg.com/element-ui/lib/theme-chalk/index.css'
        ],
        js: [
          // vue
          '//cdn.staticfile.org/vue/2.5.22/vue.min.js',
          // vue-router
          '//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
          // vuex
          '//cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
          // axios
          '//cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
          // element-ui js
          '//unpkg.com/element-ui/lib/index.js',
          // 'https://code.createjs.com/1.0.0/tweenjs.min.js'
        ]
      };
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn;
          return args;
        });

      // #endregion

      // #region 分析打包体积

      if (process.env.IS_ANALYZE) {
        config.plugin('webpack-report').use(BundleAnalyzerPlugin, [{
          analyzerMode: 'static'
        }]);
      }
      // #endregion 分析打包体积
    }
  }
};
