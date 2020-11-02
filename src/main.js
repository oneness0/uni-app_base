import Vue from 'vue';
import App from './App';
import uView from 'uview-ui';
import { http } from '@/common/request.js';
import 'weapp-cookie';
import store from '@/store';
const vuexStore = require('@/store/$u.mixin.js');

Vue.use(uView);
Vue.mixin(vuexStore);
Vue.prototype.$http = http;
Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    store,
    ...App
});
app.$mount();
