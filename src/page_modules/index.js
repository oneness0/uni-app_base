const files = require.context('.', true, /\.js$/);

// 在模块里继续引入其他子模块
const modules = [];

// 遍历当前文件夹并自动导入
files.keys().forEach(key => {
    if (key === './index.js') return;
    const item = files(key);
    modules.push(...item);
});

module.exports = modules;
