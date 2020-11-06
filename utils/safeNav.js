function safeNavigate(url, isRedirect = false) {
  const tabUrlList = [
    'pages/index/index',
    'pages/category/category',
    'pages/recommend/recommend',
    'pages/cart/cart',
    'pages/my/my',
  ]
  const isTabBar = tabUrlList.some((item) => {
    return url.toLocaleLowerCase().indexOf(item) > -1
  })
  if (isTabBar) {
    uni.switchTab({
      url,
    })
  } else {
    if (isRedirect) {
      uni.redirectTo({
        url,
      })
    } else {
      uni.navigateTo({
        url,
      })
    }
  }
}

export default safeNavigate
