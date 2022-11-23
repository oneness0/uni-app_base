const state = {
  userInfo: null,
};

const mutations = {
  SET_USERINFO(state, userInfo) {
    state.userInfo = userInfo;
    uni.setStorageSync('userInfo', userInfo);
  },
};

const actions = {
  setUserInfo({ commit }, userInfo) {
    commit('SET_USERINFO', userInfo);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
