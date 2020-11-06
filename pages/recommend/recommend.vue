<template>
  <view class="videoHome-wrap">
    <view class="video--list">
      <navigator
        v-for="item of videoList"
        :key="item.id"
        class="video--item"
        :url="`/pages/video/videoDetail/videoDetail?id=${item.id}`"
      >
        <video
          class="video"
          :src="item.vediourl"
          autoPauseIfNavigate
          showCenterPlayBtn
          showPlayBtn
          controls
          muted
          objectFit="fill"
          :poster="
            item.vediourl +
              '?x-oss-process=video/snapshot,t_0,f_jpg,w_600,h_600,m_fast'
          "
        ></video>
        <view class="video--title">{{ item.name }}</view>
        <view class="video--intro">{{ item.intro }}</view>
      </navigator>
    </view>
  </view>
</template>

<script>
import request from '../../utils/request'

export default {
  data() {
    return {
      noMore: false,
      videoList: [],
      currentPage: 1,
      pageSize: 5,
    }
  },
  onLoad() {
    this.fetchVideoList()
  },
  onReachBottom() {
    if (this.noMore) return
    this.currentPage += 1
    this.fetchVideoList()
  },
  methods: {
    async fetchVideoList() {
      const originVideoList = this.videoList
      const { data: videoList } = await request('malvideo/GetVideosList', {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        status: 1,
      })
      const noMore = videoList.length !== this.pageSize
      if (this.currentPage === 1) {
        this.videoList = videoList
        this.noMore = noMore
      } else {
        this.videoList = originVideoList.concat(videoList)
        this.noMore = noMore
      }
    },
  },
}
</script>

<style lang="scss">
.videoHome-wrap {
  width: 100%;
  min-height: 100vh;
}

.video--list {
  padding: 0 20px;
}

.video--item {
  width: 100%;
  margin-bottom: 20rpx;
}
.video {
  width: 100%;
  height: 420rpx;
  border-radius: 20rpx;
}

.video--title {
  display: -webkit-box;
  padding: 0 10rpx;
  overflow: hidden;
  font-size: 34rpx;
  line-height: 2;
  color: rgba(51, 51, 51, 1);
  word-break: break-word;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.video--intro {
  display: -webkit-box;
  padding: 0 10rpx;
  overflow: hidden;
  font-size: 30rpx;
  line-height: 30rrpx;
  color: rgba(153, 153, 153, 1);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
