const hotRequire = require('uni-pages-hot-modules');
const files = hotRequire.context('.', true, /\.js$/);

const modules = [
    {
        path: 'pages/demo/index'
    }
    // 在模块里继续引入其他子模块
    // ,...hotRequire('./home')
];

// 遍历当前文件夹并自动导入
files.keys().forEach(key => {
    if (key === './index.js') return;
    const item = files(key);
    modules.push(...item);
});

module.exports = modules;
