/**
 * pages页面快速生成脚本
 * 用法：yarn temp 文件名 [,路径]
 */

const fs = require('fs');

function firstUpperCase(str) {
    return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
}
const dirName = process.argv[2];
const dirPath = process.argv[3] || '';

if (!dirName) {
    console.log('文件名不能为空！');
    console.log('示例：yarn temp 文件名 [,路径]');
    process.exitCode = 0;
    return;
}

let path = `./src/pages/${dirPath || ''}`;
let service = `${dirPath}.service.js`;
let serviceName = `${firstUpperCase(dirName)}Service`;

// 页面模板
const indexTep = `
<template>
    <view class="container ${dirName}-container">test</view>
</template>

<script>${dirPath ? `\nimport ${serviceName} from './${dirPath}.service';` : ''}
export default {
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="scss">
.${dirName}-container {
}
</style>
`;

// 接口请求模板
const serviceTep = `
import { http } from '@/common/request';

class ${serviceName} {
    constructor() {}
}

export default new ${serviceName}();
`;

dirPath && !fs.existsSync(path) && fs.mkdirSync(path); // mkdir $1
process.chdir(path); // cd $1

fs.writeFileSync(`${dirName}.vue`, indexTep);
dirPath && !fs.existsSync(service) && fs.writeFileSync(service, serviceTep); // service
process.exitCode = 0;
