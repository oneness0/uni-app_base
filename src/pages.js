const { hot } = require('uni-pages-hot-modules');

/**
 * 输出最终的pages.json解析内容
 * @param pagesJson <Object> src/pages.json的文件解析内容（作为初始内容传入）
 * @param loader <Object> @dcloudio/webpack-uni-pages-loader会传入一个loader对象
 * @returns {Object} uni-app需要的pages.json配置内容
 */
module.exports = hot((pagesJson = {}) => {
    // pages的初始配置
    let basePages = [
        // 设置首页
        {
            path: 'pages/demo/index',
            style: {
                navigationBarTitleText: 'uniapp基础模板'
            }
        }
    ];
    // subPackages的初始配置
    let baseSubPackages = [];

    // 要输出的pages
    let pages = [...basePages, ...require('./page_modules/index.js')];

    // 要输出的subPackages
    let subPackages = [...baseSubPackages];

    return {
        // 合并pages.json的初始内容
        ...pagesJson,
        pages,
        subPackages
    };
});
