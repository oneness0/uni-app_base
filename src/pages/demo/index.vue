<template>
    <div class="container index">
        <view class="rate-box">
            <text>uviews组件展示: </text>
            <u-rate @change="rateChange" :value="vuex_star.rate" allowHalf size="21" active-color="#2979ff" inactive-color="#b2b2b2"></u-rate>
        </view>
        <div>(刷新看vuex数据持久化效果)</div>
        <u-button type="primary" @click="$u.route('/pages/demo/home')" class="nav-btn">Next to home</u-button>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        rateChange(e) {
            this.$u.vuex("vuex_star.rate", e);
        },
    },
    mounted() {},
};
</script>

<style lang="scss">
.index {
    font-size: 14px;
    padding-top: 20rpx;
    align-items: center;
    .rate-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 6px;
    }
    .nav-btn {
        margin-top: auto;
        margin-bottom: 30px;
        width: 300rpx;
    }
}
</style>
