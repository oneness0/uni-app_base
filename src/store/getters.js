const getters = {
  userInfo: (state) => state.user.userInfo || uni.getStorageSync('userInfo') || {},
};
export default getters;
