/**
 * pages页面快速生成脚本
 * 用法：npm run tep `文件名`
 */

// eslint-disable-next-line import/no-commonjs
const fs = require('fs')

const dirName = process.argv[2]
if (!dirName) {
  // eslint-disable-next-line no-console
  console.log('文件夹名称不能为空！')
  // eslint-disable-next-line no-console
  console.log('示例：npm run tep test')
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

// 接口请求模板
const serviceTep = `
import API from '../../utils/request'

export const testApi = data => API.test(
  data
)
`

fs.mkdirSync(`./pages/${dirName}`) // mkdir $1
process.chdir(`./pages/${dirName}`) // cd $1

fs.writeFileSync(`${dirName}.vue`, indexTep)
fs.writeFileSync('service.js', serviceTep) // service
process.exit(0)
