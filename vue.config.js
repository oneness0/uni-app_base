const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { domain, productionGzip, productionGzipExtensions } = require('./src/common/config');

module.exports = {
    // 通过Babel显式转译指定依赖
    transpileDependencies: ['luch-request'],
    //多核构建
    parallel: true,

    chainWebpack: config => {
        // 发行或运行时启用了压缩时会生效
        config.optimization.minimizer('terser').tap(args => {
            const compress = args[0].terserOptions.compress;
            // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
            compress.drop_console = true;
            compress.pure_funcs = [
                '__f__' // App 平台 vue 移除日志代码
                // 'console.debug' // 可移除指定的 console 方法
            ];
            return args;
        });
    },

    configureWebpack: config => {
        // NOTE:好像nvue不支持alias
        const myConfig = {};
        myConfig.plugins = [];
        if (process.env.NODE_ENV === 'production') {
            productionGzip &&
                process.env.UNI_PLATFORM === 'h5' &&
                myConfig.plugins.push(
                    new CompressionWebpackPlugin({
                        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), //匹配文件名
                        threshold: 10240, //对10K以上的数据进行压缩
                        minRatio: 0.8,
                        deleteOriginalAssets: false //是否删除源文件
                    })
                );
        }
        return myConfig;
    },

    devServer: {
        disableHostCheck: true,
        port: '8585',
        proxy: {
            '/api': {
                target: domain,
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};
