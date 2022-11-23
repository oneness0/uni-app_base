/**
 * 获取状态栏 导航栏高度 (用于自定义navbar)
 */
export const getTitleHeight = {
  data() {
    return {
      titleHeight: 0, //状态栏高度+导航栏高度
      statusBarHeight: 0, // 状态栏高度
      navHeight: 0, // 导航栏高度
    };
  },
  onLoad() {
    if (uni.$u.platform === 'mp') {
      const menuButtonObject = uni?.getMenuButtonBoundingClientRect(); //获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
      const res = uni.getSystemInfoSync();
      let navHeight = menuButtonObject.height + (menuButtonObject.top - res.statusBarHeight) * 2; //导航栏高度=菜单按钮高度+（菜单按钮与顶部距离-状态栏高度）*2
      const statusBarHeight = res.statusBarHeight;
      this.titleHeight = navHeight + statusBarHeight;
      this.statusBarHeight = statusBarHeight;
      this.navHeight = navHeight;
    }
  },
};
