import { AppId, AppSpecial, MAINHOST } from '../config'
import _md5Module from '../vender/md5_module.js'

export const goLogin = function() {
  const pageList = getCurrentPages()
  const pageThis = pageList[pageList.length <= 1 ? 0 : pageList.length - 1]

  let pageRoute = pageThis ? pageThis.route : 'pages/index/index'
  const pageOptionsKeys = pageThis ? Object.keys(pageThis.options) : []
  let optionsStr = ''
  pageOptionsKeys.map(function(item) {
    optionsStr += '&' + item + '=' + pageThis.options[item]
  })
  optionsStr = optionsStr.length > 0 ? '?' + optionsStr.substring(1) : ''
  pageRoute = encodeURIComponent('/' + pageRoute + optionsStr)
  uni.redirectTo({
    url: '/pages/login/login?fromUrl=' + pageRoute,
  })
}

const requestUtil = (
  url,
  params = {},
  { showError, autoLogin } = { showError: true, autoLogin: true }
) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error('请求路径为空'))
    }
    // 签名
    const romcode = Math.random()
    const timestamp = Math.round(Date.now() / 1000)
    const tempStr =
      AppSpecial +
      'appKey=' +
      AppId +
      'nonceStr=' +
      romcode +
      'timeStamp=' +
      timestamp +
      AppSpecial
    const md5Str = _md5Module.MD5(tempStr).toUpperCase()
    uni.showLoading({
      title: '正在请求...',
    })
    uni.request({
      url: MAINHOST + url,
      data: params,
      header: {
        NonceStr: romcode,
        Timestamp: timestamp,
        Sign: md5Str,
        Token: uni.getStorageSync('userToken'),
        ReqestFrom: 'SMALL_PROGRAM',
        AppKey: AppId,
        siid: 'f9eab77eb5d2fdc4392404b98726ebc037454767',
        storeId: uni.getStorageSync('storeId'),
      },
      method: 'POST',
      success: (rt) => {
        const statusCode = rt.data.code
        const errMessage = rt.data.msg || rt.data.message || ''
        if (statusCode == 401 && autoLogin) {
          // 未授权
          goLogin()
        } else if (statusCode == 401 && !autoLogin) {
          reject(new Error('401'))
        } else if (statusCode == 200) {
          resolve(rt.data.data)
        } else {
          if (showError) {
            uni.showModal({
              title: '提示',
              showCancel: false,
              content: errMessage,
            })
          } else {
            reject(new Error(errMessage))
          }
        }
      },
      // 请求失败
      fail: (rt) => {
        const errMessage = rt.errMsg || ''
        if (showError) {
          uni.showModal({
            title: '提示',
            showCancel: false,
            content: errMessage,
          })
        } else {
          reject(new Error(errMessage))
        }
      },
      complete: () => {
        uni.hideLoading()
      },
    })
  })
}

export default requestUtil
