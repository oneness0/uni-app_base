import Vue from 'vue';
// import 'weapp-cookie';
import App from './App';
import store from './store';
import uView from 'uview-ui';
Vue.use(uView);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  store,
  ...App,
});

// 引入请求封装，将app参数传递到配置中
require('./utils/request.js')(app);

app.$mount();
