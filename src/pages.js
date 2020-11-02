module.exports = (pagesJson, loader) => {
    const hotRequire = require('uni-pages-hot-modules')(loader);
    let basePages = [];
    let baseSubPackages = [];

    return {
        // 合并pages.json的内容
        ...pagesJson,
        //NOTE: 这里文件名不能简写，简写会导致不能热重载
        pages: [...basePages, ...hotRequire('./page_modules/index.js')],
        subPackages: [...baseSubPackages]
    };
};
