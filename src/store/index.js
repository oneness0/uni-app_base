import Vue from 'vue';
import Vuex from 'vuex';
import CreatePersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [
        CreatePersistedState({
            //自定义存储方式
            storage: {
                getItem: key => uni.getStorageSync(key),
                setItem: (key, value) => uni.setStorageSync(key, value),
                removeItem: key => uni.removeStorageSync(key)
            },
            // 指定需要持久化的state
            reducer(val) {
                return {
                    vuex_star: val.vuex_star
                };
            }
        })
    ],
    state: {
        vuex_star: {
            rate: 1
        }
    },
    mutations: {
        $uStore(state, payload) {
            // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
            let nameArr = payload.name.split('.');
            let len = nameArr.length;
            if (nameArr.length >= 2) {
                let obj = state[nameArr[0]];
                for (let i = 1; i < len - 1; i++) {
                    obj = obj[nameArr[i]];
                }
                obj[nameArr[len - 1]] = payload.value;
            } else {
                // 单层级变量，在state就是一个普通变量的情况
                state[payload.name] = payload.value;
            }
        }
    }
});

export default store;
