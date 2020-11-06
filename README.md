# uni-app 脚手架

## 安装

### simple

1. 下载安装 HBuilder X
2. HBuilder 安装 scss/sass 编译插件
3. 使用 HBuilder 开发

### complex

1. 下载安装 HBuilder X
2. HBuilder 安装 scss/sass 编译插件
3. 文件夹下运行 `yarn` 或 `npm install` 安装依赖
4. 启动项目
5. 用 VSCode 编写，提交代码

## 代码质量工具

### eslint

配置文件 `/.eslintrc.js`
行内临时禁用某条 `/* eslint-disable no-alert, no-console */`

### stylelint

配置文件 `/stylelint.config.js`

### markdownlint

配置文件 `/.markdownlint.yml`

### husky + lint-staged

每次提交变更自动运行 `prettier eslint stylelint markdownlint`,如有错误提交失败，直到所有错误被修复

## 快速生成模板

- 使用 `npm run tem test` 在 `pages` 文件夹中快速生成页面
- 使用 `npm run com test` 在 `components` 文件夹中快速生成组件

## 代码相关

### util 工具类

工具类函数分类放置于 `/utils` 文件夹内
例如 `safeNav.js` 为安全的路由跳转，不用在之后每一次判断路由应该用 switch 还是 navigate.

### 接口请求工具

`/utils/request.js` Promise 化调用

### 环境切换

`/config/index.js` 中存放与环境相关的变量信息

### 第三方代码

`vender` 文件夹存放第三方代码
