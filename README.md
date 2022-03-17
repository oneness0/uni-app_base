## uni-app 初始模板 (vue2)

### 简介

使用[vue-cli 命令行](https://uni-app.dcloud.io/quickstart?id=_2-%e9%80%9a%e8%bf%87vue-cli%e5%91%bd%e4%bb%a4%e8%a1%8c)方式创建的 uni-app 项目

模板具有以下功能特性:

-   使用[easycom 模式](https://uni-app.dcloud.io/collocation/pages?id=easycom)引入[uview-ui](http://www.uviewui.com/)和[uni-ui](https://github.com/dcloudio/uni-ui)UI 框架
-   使用[luch-request](https://www.quanzhan.co/luch-request/guide/3.x/)作为网络请求库。并完善了拦截器、全局请求 loading 控制等
-   使用[weapp-cookie](https://github.com/charleslo1/weapp-cookie#readme)库让小程序和 APP 端支持 cookie
-   使用[vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate#readme)库让 vuex 数据持久化
-   使用[uni-pages-hot-modules](https://github.com/devilwjp/uni-pages-hot-modules#readme)库让 page.josn 支持模块化
-   [jweixin-module](https://github.com/zhetengbiji/jweixin-module#readme)库为微信 JS-SDK
-   更加人性化的 vuex 使用方式
-   全局统一的配置文件 config.js
-   支持 npm 命令自动生成组件和页面模板
-   支持 npm 命令更新 uni-app 编译器 、uni-ui 和 uview
-   打包优化：默认开启 gzip 压缩、摇树优化，移除 console 代码
-   引用[eruda](https://github.com/liriliri/eruda/blob/master/doc/README_CN.md)方便 h5 调试

### 快速启动

推荐使用[pnpm](https://www.pnpm.cn/)（其他涉及到 npm 命令会用 pnpm 介绍）

```bash
# 1.安装依赖
pnpm i
# OR
npm i

# 2.运行h5项目
pnpm serve
# OR
npm run serve

#...
```

### 具体说明

#### easycom

easycom 引入的组件无需再写 import，相关规则在 page.json>easycom 中修改

#### 请求封装

基于[luch-request](https://www.quanzhan.co/luch-request/guide/3.x/)（请求 API 参见 luch-request 3.x 版本的文档）  
封装的 request.js 挂载在 vue 的 prototype 上`Vue.prototype.$http = http`  
全局 loading 的配置可在 config.js 中的 requestConfig 修改

```js
// config.js
module.exports = {
    domain: 'http://www.example.com',
    // 是否使用gzip
    productionGzip: true,
    // 需要gzip压缩的文件后缀
    productionGzipExtensions: ['js', 'css', 'ttf', 'svg'],
    // 是否启用移动端h5调试，url后加eruda=true启用(只在h5和dev环境有效)
    erudaDebug: true,
    requestConfig: {
        showLoading: true, // 是否显示请求中的loading
        loadingText: '请求中...', // loading显示的文本
        loadingTime: 200, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
        originalData: false, // 是否在拦截器中返回服务端的原始数据
        loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    }
};
```

单个请求的 loading 参数修改,在请求中的 custom 传入覆盖即可(接口请求)

```js
//示例
this.$http.post(
    '/test',
    {},
    {
        custom: {
            loadingText: '上传中...'
            //其他loading参数...
        }
    }
);
```

tip: 多个 loading 触发时, 默认前面的 loadingText 不会被后面的覆盖; 如果需要覆盖, 自行修改 request.js 中 loading 的代码

#### vuex

vuex 的优化写法参考[uview 给的方案](http://www.uviewui.com/guide/globalVariable.html#%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0)(去掉了 uview 的 vuex 数据持久化方式, 改用 vuex-persistedstate 实现)

#### page 模块化

在 pages.js 或 page_modules 中的模块写 pages 配置, page.json 中就无需再写

#### 自定义 npm 脚本

-   `pnpm uvm`(只支持 pnpm): 更新 uni-app 编译器 、uni-ui 和 uview，自动更新 package.json 并下载包。为什么不直接用 npm 自带的`npm uvm`，因为它不能筛选包，并会把 package.json 中所有的包更新。

    > 更改 uvm 规则请参考[npm-check-updates](https://github.com/raineorshine/npm-check-updates)文档, 修改位置位于 package.json 下的:  
    > "uvm": "node src/common/scripts/scripts.js update && ncu <font color=#d73a49>\"/^@dcloudio.\*\$|uview-ui/\"</font> -u && pnpm i"

-   `pnpm temp 文件名 [,路径]`: 生成页面模板
-   `pnpm temp:com 文件名 [,路径]`: 生成组件模板

#### eruda 调试

在 index.html 中引入，开发环境并且是 h5 时，在地址栏后加参数`eruda=true`使用

#### 其他事项

> 相关库的使用方式参考对应库的文档

### 文件目录树

```
 ┣ 📂public
 ┃ ┗ 📜index.html        # 入口html
 ┣ 📂src
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂scripts         # 脚本文件夹
 ┃ ┃ ┃ ┣ 📜component.js
 ┃ ┃ ┃ ┣ 📜scripts.js
 ┃ ┃ ┃ ┗ 📜template.js
 ┃ ┃ ┣ 📜config.js       # 全局配置
 ┃ ┃ ┗ 📜request.js      # 请求封装
 ┃ ┣ 📂components
 ┃ ┣ 📂pages
 ┃ ┣ 📂page_modules      # page模块文件夹
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂static            # 静态资源
 ┃ ┣ 📂store
 ┃ ┃ ┣ 📜$u.mixin.js     # vuex优化
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📜App.vue
 ┃ ┣ 📜main.js
 ┃ ┣ 📜manifest.json
 ┃ ┣ 📜pages.js          # page模块入口js
 ┃ ┣ 📜pages.json
 ┃ ┗ 📜uni.scss
 ┣ 📜.editorconfig       # 编辑器配置
 ┣ 📜.gitignore
 ┣ 📜.npmrc
 ┣ 📜.prettierrc.js      # prettier配置
 ┣ 📜babel.config.js
 ┣ 📜package.json
 ┣ 📜postcss.config.js
 ┣ 📜README.md
 ┣ 📜vue.config.js
```

### TODO

API 管理或自动生成  
权限管理  
代码提交钩子(代码格式化和规范 commit)  
代码打包优化完善  
uni-app 预加载  
全局注入自定义组件（[已有方案](https://zhuanlan.zhihu.com/p/183919769), 但是只支持小程序，可以参考下）  
跟随 uni-app 更新到 vue3  
忽略打包配置文件  
iconfont 引入

### 参考资料

-   字体开启 gzip https://www.cnblogs.com/zhongxia/p/5901027.html
-   Nvue 排错指南 http://www.uviewui.com/components/nvue.html
