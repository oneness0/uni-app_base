<template>
  <view class="wrapper">
    <button
      class="button-info"
      open-type="getUserInfo"
      :disabled="isAuthed"
      @getuserinfo="getUserInfo"
    >
      <image class="avatar" :src="userInfo.avatarUrl" />
      <view class="tip">{{ userInfo.nickName || '点击授权昵称及头像' }}</view>
    </button>
    <button
      class="button-mobile"
      open-type="getPhoneNumber"
      @getphonenumber="getPhoneNumber"
      >手机授权</button
    >
    <button class="button__plain" @click="naviBack">暂不登录</button>
    <!-- 邀请注册-邀请人、门店提示 -->
    <view v-if="inviterStore" class="inviteInfo">
      <view>邀请人：{{ inviterName }}</view>
      <view>{{ inviterStore }}</view>
    </view>
  </view>
</template>

<script>
import request from '../../utils/request'
import safeNav from '../../utils/safeNav'
import _util from '../../utils/util'

const _app = getApp()

export default {
  data() {
    return {
      inviterName: '',
      inviterStore: '',
      userInfo: {
        avatarUrl:
          'https://bk-oss.oss-cn-shanghai.aliyuncs.com/material/avatar.png',
        nickName: '',
      },
      isAuthed: false,

      // 非响应式数据
      openId: '',
      activityType: '',
      inviterEmployee: '',
      inviterMember: '',
      fromUrl: '',
    }
  },
  onLoad: function(options) {
    this.fromUrl = options.fromUrl
      ? decodeURIComponent(options.fromUrl)
      : '/pages/index/index'

    this.activityType =
      options.activitytype || _util.getQueryString(options.q, 'activitytype')

    /**
     * 从各种位置获取 eid
     */
    const eid =
      [
        options.eid,
        _util.getQueryString(options.q, 'eid'),
        _app.globalData.shareEmployeeId,
      ].find((item) => item) || ''
    this.inviterEmployee = eid
    /**
     * 从各种位置获取 cid
     */
    const cid =
      [
        options.cid,
        _util.getQueryString(options.q, 'cid'),
        _app.globalData.shareOldCid,
      ].find((item) => item) || ''
    this.inviterMember = cid
    this.login()
  },
  methods: {
    async getUserInfo({ detail }) {
      this.isAuthed = true
      const { data } = await request('mallwechat/GetWxUserDetail', {
        openId: this.openId,
        iv: detail.iv,
        encryptedData: detail.encryptedData,
      })
      const [, { code }] = await uni.login()
      const { data: openIdInfo } = await request(
        'MallWeChat/GetSessionKeyByCode',
        {
          code,
        }
      )
      this.openId = openIdInfo.openId
      this.userInfo = data
      this.isAuthed = true
    },
    // 授权获取手机号同时登录
    async getPhoneNumber({ detail }) {
      const { encryptedData, errMsg, iv } = detail
      const { nickName, avatarUrl, unionId } = this.userInfo
      if (errMsg !== 'getPhoneNumber:ok') return
      const data = await request('MallWeChat/GetWxPhoneInfoAndSignup', {
        openId: this.openId,
        iv,
        encryptedData,
        nickName,
        avatarUrl,
        unionId,
        employeeId: this.inviterEmployee,
        oldCustomerId: this.inviterMember,
        storeId: uni.getStorageSync('storeId'),
        activityType: this.activityType,
      })
      _app.globalData.sparType = data.sparType
      uni.setStorageSync('userHeadImage', avatarUrl)
      uni.setStorageSync('userNickName', nickName)
      uni.setStorageSync('isNewMember', data.isNew)
      await this.saveInfo(data)
      safeNav(this.fromUrl, true)
    },
    // 将信息持久化保存到本地
    async saveInfo(info = {}) {
      const savingPromise = [
        ['userToken', 'token'],
        ['userRealPhone', 'uphone'],
        ['userPhone', 'uphone'],
        ['storeId', 'storeId'],
        ['storeName', 'storeName'],
        ['storeCode', 'storeCode'],
        ['storeAddress', 'storeAddress'],
        // ['storeLink', 'storeLink'],
        ['bindStoreId', 'storeId'],
        ['bindStoreName', 'storeName'],
        ['bindStoreCode', 'storeCode'],
        ['bindStoreAddress', 'storeAddress'],
        ['userid', 'userId'],
        ['masterId', 'masterId'],
      ]
        .filter((item) => info[item[1]])
        .map((item) => uni.setStorage({ key: item[0], data: info[item[1]] }))
      await Promise.all(savingPromise)
    },

    // 根据 inviterMemberId 和 inviterEmployeeId 获取即将绑定的门店信息
    async getInviterInfo() {
      if (!this.inviterMember && !this.inviterEmployee) return
      const { data } = await request('cstore/getcustomerstore', {
        cid: this.inviterMember,
        eid: this.inviterEmployee,
      })
      const { customer, employee, store } = data
      if (this.inviterMember) {
        this.inviterName = customer.buyerNick
        this.inviterStore = store.name
      } else {
        this.inviterName = employee.name
        this.inviterStore = store.name
      }
      const savingPromise = [
        ['storeId', 'id'],
        ['storeName', 'name'],
        ['storeCode', 'storeCode'],
        ['storeAddress', 'address'],
      ]
        .filter((item) => store[item[1]])
        .map((item) => uni.setStorage({ key: item[0], data: store[item[1]] }))
      await Promise.all(savingPromise)
    },

    naviBack() {
      uni.switchTab({
        url: '/pages/index/index',
      })
    },

    // 微信默认登录
    async login() {
      const [, { code }] = await uni.login()
      const data = await request('MallWeChat/GetSessionKeyByCode', {
        code,
      })

      if (data.token) {
        _app.globalData.sparType = data.sparType
        await this.saveInfo(data)
        safeNav(this.fromUrl, true)
      } else {
        this.openId = data.data.openId
      }
      await this.getInviterInfo()
    },
  },
}
</script>

<style lang="scss">
.button-info::after {
  display: none;
}
.button-info {
  padding-bottom: 100rpx;
  color: #333 !important;
  background-color: #fff !important;
}
.avatar {
  display: block;
  width: 160rpx;
  height: 160rpx;
  margin: 84rpx auto 40rpx;
}
.tip {
  width: 600rpx;
  margin: 0 auto;
  font-size: 30rpx;
  line-height: 1;
}

.button-mobile {
  width: 543rpx;
  height: 88rpx;
  margin: 200rpx auto 0;
  font-size: 32rpx;
  line-height: 88rpx;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  background: rgba(86, 206, 203, 1);
  border-radius: 44rpx;
}
.button__plain {
  width: 543rpx;
  height: 88rpx;
  margin: 20rpx auto 0;
  font-size: 32rpx;
  line-height: 88rpx;
  color: rgba(86, 206, 203, 1);
  text-align: center;
  background: #fff;
  border: 1rpx solid rgba(86, 206, 203, 1);
  border-radius: 44rpx;
}
.inviteInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 543rpx;
  height: 30rpx;
  margin: 225rpx auto 0;
  font-size: 26rpx;
  color: rgba(153, 153, 153, 1);
}
</style>
