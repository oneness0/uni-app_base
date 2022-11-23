const { hot } = require('uni-pages-hot-modules');
module.exports = hot((pagesJson) => {
  let basePages = [];
  let baseSubPackages = [];

  return {
    // 合并pages.json的内容
    ...pagesJson,
    pages: [...basePages, ...require('./page_modules/home.js')],
    subPackages: [...baseSubPackages],
  };
});
