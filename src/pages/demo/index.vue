<template>
    <div class="container">
        <p>uniapp初始模板</p>
        <p style="display: flex">uni-ui展示: <uni-rate :size="18" :value="5" /></p>
        <p>uviews展示: <u-rate @change="rateChange" :value="vuex_star.rate"></u-rate>{{ vuex_star.rate }}星</p>
        <u-button @click="$u.route('/pages/demo/home')">Next to home</u-button>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        rateChange(e) {
            this.$u.vuex('vuex_star.rate', e);
        }
    },
    mounted() {
        this.$http.post('/test');
        setTimeout(() => {
            this.$http.post('/testError').catch(() => {
                uni.showToast({
                    title: 'testError请求fail',
                    icon: 'none'
                });
            });
        }, 1000);
    }
};
</script>

<style lang="scss">
p {
    padding: 15rpx 0;
}
</style>
