/* 全局配置文件 */
module.exports = {
    domain: "", // 接口域名
    // 是否使用gzip
    productionGzip: true,
    // 需要gzip压缩的文件后缀
    productionGzipExtensions: ["js", "css", "ttf", "svg"],
    requestConfig: {
        showLoading: true, // 是否显示请求中的loading
        loadingText: "请求中...",
        loadingTime: 200, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
        originalData: false, // 是否在拦截器中返回服务端的原始数据
        loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    },
};
