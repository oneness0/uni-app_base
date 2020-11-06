/**
 * components 页面快速生成脚本
 * 用法：npm run com `文件名`
 */

// eslint-disable-next-line import/no-commonjs
const fs = require('fs')

const dirName = process.argv[2]
if (!dirName) {
  // eslint-disable-next-line no-console
  console.log('文件夹名称不能为空！')
  // eslint-disable-next-line no-console
  console.log('示例：npm run com test')
  process.exit(0)
}

// 页面模板
const indexTep = `<template>
  <view class="test--container">test</view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
}
</script>

<style>
.${dirName}--container {
  width: 100%;
}
</style>
`

fs.mkdirSync(`./components/${dirName}`) // mkdir $1
process.chdir(`./components/${dirName}`) // cd $1

fs.writeFileSync(`${dirName}.vue`, indexTep)
process.exit(0)
