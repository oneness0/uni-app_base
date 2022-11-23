module.exports = {
  // 通过Babel显式转译指定依赖
  transpileDependencies: ['uview-ui'],
  //多核构建
  parallel: true,

  chainWebpack: (config) => {
    // 发行或运行时启用了压缩时会生效
    config.optimization.minimizer('terser').tap((args) => {
      const compress = args[0].terserOptions.compress;
      // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
      compress.drop_console = true;
      compress.pure_funcs = [
        '__f__', // App 平台 vue 移除日志代码
        // 'console.debug' // 可移除指定的 console 方法
      ];
      return args;
    });
  },
  devServer: {
    // 配置服务器代理
    proxy: {
      '^/basic-api': {
        target: process.env.VUE_APP_DOMAIN, // 对应的代理地址
        changeOrigin: true,
        pathRewrite: {
          '^/basic-api': '',
        },
      },
    },
  },
};
