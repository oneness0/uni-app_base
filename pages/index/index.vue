<template>
  <view class="container">
    <uni-card title="uni-ui" note="Tips">
      <template>
        <view>
          <text class="intro"
            >本项目为包含uni-ui全部组件的项目，在pages.json内使用easycom通过正则匹配自动引入组件。以本页面为例，uni-card为自动导入组件，无需在页面内import即可使用，效果等同于页面内import。</text
          >
        </view>
        <view>
          <text class="intro">详见：</text>
          <uni-link :href="href" :text="href"></uni-link>
        </view>
      </template>
    </uni-card>
  </view>
</template>

<script>
export default {
  data() {
    return {
      href: 'https://uniapp.dcloud.io/collocation/pages?id=easycom',
    }
  },
  mounted() {
    uniCloud.callFunction({
      name: 'login',
      data: {
        phone: '13057575521',
        psw: 123,
      },
    })
  },
  methods: {},
}
</script>

<style>
.intro {
  font-size: 14px;
  line-height: 24px;
}
</style>
