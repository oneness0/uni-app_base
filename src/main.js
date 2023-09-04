import Vue from 'vue';
import App from './App';
import uView from 'uview-ui';
import { http } from '@/common/request.js';
import 'weapp-cookie';
import store from '@/store';

Vue.use(uView);
Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    store,
    ...App
});

// 引入请求封装，将app参数传递到配置中
http(app)

app.$mount();
