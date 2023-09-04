<script>
export default {
    onLaunch: function() {
        console.log('App Launch');
    },
    onShow: function() {
        console.log('App Show');
    },
    onHide: function() {
        console.log('App Hide');
    },
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
/*每个页面公共css */
uni-page-body {
    color: #0a0a0a;
}
.container {
    width: 100vw;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    min-height: calc(100vh - var(--window-top));
}
</style>
