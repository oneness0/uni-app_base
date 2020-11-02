/**
 * components 页面快速生成脚本
 * 用法：yarn temp:com 文件名 [,路径]
 */

const fs = require('fs');

const dirName = process.argv[2];
const dirPath = process.argv[3] || '';

if (!dirName) {
    console.log('文件名不能为空！');
    console.log('示例：yarn temp:com 文件名 [,路径]');
    process.exitCode = 0;
    return;
}

// 页面模板
const indexTep = `
<template>
    <view class="${dirName}-container">test</view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="scss">
.${dirName}-container {
    width: 100%;
}
</style>
`;

let path = `./src/components/${dirPath || ''}`;
dirPath && !fs.existsSync(path) && fs.mkdirSync(path); // mkdir $1
process.chdir(path); // cd $1

fs.writeFileSync(`${dirName}.vue`, indexTep);
process.exitCode = 0;
