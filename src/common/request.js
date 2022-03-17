/**
 * 文档: https://www.quanzhan.co/luch-request/
 * github: https://github.com/lei-mu/luch-request
 * 请求封装
 */
import Request from 'luch-request';
import { requestConfig, domain } from './config';

const getTokenStorage = () => {
    let token = '';
    try {
        token = uni.getStorageSync('token');
    } catch (e) {
        //TODO handle the exception
    }
    return token;
};
const http = new Request();
const timer = new Map(); // 存储loading的定时器
http.setConfig(config => {
    /* 设置全局配置 */
    config.baseURL = domain; /* 根域名不同 */
    config.header = {
        ...config.header
    };
    config.custom = {
        ...requestConfig,
        guid: '' // 指定定时器的唯一性
    };
    return config;
});

http.interceptors.request.use(
    config => {
        /* 请求之前拦截器。可以使用async await 做异步操作 */
        config.header = {
            ...config.header,
            token: getTokenStorage()
        };
        /* if (!token) {
            // 如果token不存在，return Promise.reject(config) 会取消本次请求
            return Promise.reject(config);
        } */

        // 是否显示loading
        const { showLoading, loadingText, loadingMask, loadingTime } = config.custom;
        if (showLoading) {
            const timeGuid = uni.$u.guid();
            config.custom.guid = timeGuid;
            timer.set(
                timeGuid,
                setTimeout(() => {
                    timer.size === 1 &&
                        uni.showLoading({
                            title: loadingText,
                            mask: loadingMask
                        });
                }, loadingTime)
            );
        }

        return config;
    },
    config => {
        return Promise.reject(config);
    }
);

http.interceptors.response.use(
    async response => {
        /* 请求之后拦截器。可以使用async await 做异步操作  */
        clearTimer(response.config.custom?.guid);
        if (response.data.code !== 0) {
            // 服务端返回的状态码不等于200，则reject()
            return Promise.reject(response);
        }
        return response.config.custom.originalData ? response : response.data;
    },
    response => {
        // 请求错误做点什么。可以使用async await 做异步操作
        console.log(response);
        clearTimer(responseconfig.custom?.guid);
        return Promise.reject(response);
    }
);

// 隐藏loading并清除定时器
function clearTimer(guid) {
    timer.size < 2 && uni.hideLoading();
    if (guid) {
        clearTimeout(timer.get(guid));
        timer.delete(guid);
    }
}

export { http };
