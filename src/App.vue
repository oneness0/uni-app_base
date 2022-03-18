<script>
import { erudaDebug } from '@/common/config';
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
    globalData: {
        erudaDebug
    }
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
/*每个页面公共css */
uni-page-body {
    color: #0a0a0a;
}
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100vh - var(--window-top));
}
</style>
