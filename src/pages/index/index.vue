<template>
  <view class="homeLayout pageBg">
    <custom-nav-bar title="推荐"></custom-nav-bar>
    <view class="banner">
      <swiper
        indicator-dots
        indicator-color="rgba(255,255,255,0.5)"
        indicator-active-color="#fff"
        autoplay
        circular
      >
        <swiper-item v-for="item in bannerList" :key="item._id">
          <view
            class="like"
            v-if="item.target === 'miniProgram'"
            @click="goToMiniProgram(item)"
          >
            <image :src="item.picurl" alt="" mode="widthFix" />
          </view>
          <navigator
            v-else
            :url="`/pages/classlist/classlist?${item.url}`"
            class="like"
          >
            <image :src="item.picurl" alt="" mode="widthFix" />
          </navigator>
        </swiper-item>
      </swiper>
    </view>
    <view class="notice">
      <view class="left">
        <uni-icons type="sound-filled" size="30"></uni-icons>
        <text class="text">公告</text>
      </view>
      <view class="center">
        <swiper autoplay circular vertical interval="1500" duration="300">
          <swiper-item v-for="item in noticeList" :key="item._id">
            <!-- <navigator :url="'/pages/notice/detail?id=' + item._id"> -->
            <navigator :url="`/pages/notice/detail?id=${item._id}`">
              {{ item.title }}
            </navigator>
          </swiper-item>
        </swiper>
      </view>
      <view class="right">
        <uni-icons type="right" size="16" color="#333"></uni-icons>
      </view>
    </view>
    <view class="select">
      <common-title>
        <template #left>每日推荐</template>
        <template #right>
          <view class="date">
            <uni-icons type="calendar" size="18"> </uni-icons>
            <view class="text">
              <uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
            </view>
          </view>
        </template>
      </common-title>
      <view class="content">
        <scroll-view scroll-x>
          <view class="box" v-for="item in dayRandomList" :key="item._id">
            <image
              :src="item.smallPicurl"
              alt=""
              mode="aspectFill"
              @click="goToPreview(item._id)"
            />
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="theme">
      <common-title>
        <template #left>专题精选</template>
        <template #right>
          <navigator
            url="/pages/classify/classify"
            open-type="switchTab"
            class="more"
          >
            More+
          </navigator>
        </template>
      </common-title>
      <view class="content">
        <theme-item
          v-for="item in classifyList"
          :key="item._id"
          :item="item"
        ></theme-item>
        <theme-item :isMore="true"></theme-item>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import {
  dayRandomListAPI,
  getBannerAPI,
  getClassifyListAPI,
  getNoticeListAPI,
} from '../../api/apis'
// 跳转到其他小程序
const goToMiniProgram = item => {
  console.log(item)
  uni.navigateToMiniProgram({
    appId: item.appid,
    // path: item.path,
  })
}
// 获取公告
const noticeList = ref([])
const getNoticeList = async () => {
  const res = await getNoticeListAPI({ select: true })
  noticeList.value = res.data.data
}
// 获取专题精选
const classifyList = ref([])
const getClassifyList = async () => {
  const res = await getClassifyListAPI({ select: true })
  classifyList.value = res.data.data
}

// 获取轮播图
const bannerList = ref([])
const getBanner = async () => {
  const res = await getBannerAPI()
  bannerList.value = res.data.data
}
// 获取每日推荐的9张图
const dayRandomList = ref([])
const getDayRandom = async () => {
  const res = await dayRandomListAPI()
  dayRandomList.value = res.data.data
}
// 分享给好友
onShareAppMessage(e => {
  return {
    title: '李成的壁纸库',
    path: '/pages/index/index',
  }
})
// 分享到朋友圈
onShareTimeline(() => {
  return {
    title: '李成的壁纸库',
    imageUrl: 'https://tea.qingnian8.com/api/bizhi/banner/1.jpg',
  }
})
getBanner()
getDayRandom()
getNoticeList()
getClassifyList()
// 跳转到预览页
const goToPreview = id => {
  uni.setStorageSync('storageClassList', dayRandomList.value)
  uni.navigateTo({
    url: '/pages/preview/preview?id=' + id,
  })
}
</script>

<style lang="scss" scoped>
.homeLayout {
  .banner {
    width: 750rpx;
    padding: 30rpx 0;
    swiper {
      width: 750rpx;
      height: 340rpx;
      &-item {
        width: 100%;
        height: 100%;
        padding: 0 30rpx;
        .like {
          width: 100%;
          height: 100%;
          image {
            width: 100%;
            height: 100%;
            border-radius: 20rpx;
          }
        }
      }
    }
  }
  .notice {
    width: 690rpx;
    height: 80rpx;
    line-height: 80rpx;
    background-color: rgb(234, 234, 234);
    margin: 0 auto;
    border-radius: 80rpx;
    display: flex;
    .left {
      width: 140rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      :deep(.uni-icons) {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $brand-theme-color !important;
      }
      // .uni-icons {
      //   color: $brand-theme-color;
      // }
      .text {
        color: $brand-theme-color;
        font-size: 28rpx;
        font-weight: 600;
      }
    }
    .center {
      flex: 1;
      swiper {
        width: 100%;
        height: 100%;
        &-item {
          height: 100%;
          font-size: 30rpx;
          color: #666;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .right {
      width: 70rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .select {
    padding-top: 50rpx;
    .content {
      width: 720rpx;
      margin-left: 30rpx;
      margin-top: 30rpx;
      scroll-view {
        white-space: nowrap;
        .box {
          width: 200rpx;
          height: 430rpx;
          display: inline-block;
          margin-right: 15rpx;
          image {
            width: 100%;
            height: 100%;
            border-radius: 20rpx;
          }
        }
        .box:last-child {
          margin-right: 30rpx;
        }
      }
    }
    .date {
      display: flex;
      align-items: center;
      color: $brand-theme-color;
      :deep(.uni-icons) {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $brand-theme-color !important;
      }
      .text {
        margin-left: 10rpx;
      }
    }
  }
  .theme {
    padding: 50rpx 0;
    .more {
      font-size: 32rpx;
      color: #888;
    }
    .content {
      margin-top: 30rpx;
      padding: 0 30rpx;
      display: grid;
      gap: 15rpx;
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
