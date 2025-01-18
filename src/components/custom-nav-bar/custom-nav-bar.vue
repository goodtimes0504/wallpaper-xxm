<template>
  <view class="layout">
    <view class="navbar">
      <view
        class="statusBar"
        :style="{ height: getStatusBarHeight() + 'px' }"
      ></view>
      <view
        class="titleBar"
        :style="{
          height: getTitleBarHeight() + 'px',
          marginLeft: getLeftIconLeft() + 'px',
        }"
      >
        <view class="title">{{ title }}</view>
        <view class="search" @click="onSearch">
          <uni-icons
            type="search"
            size="18"
            color="#888"
            class="icon"
          ></uni-icons>
          <text class="text">搜索</text>
        </view>
      </view>
    </view>
    <view class="fill" :style="{ height: getNavBarHeight() + 'px' }"></view>
  </view>
</template>

<script setup>
import {
  getStatusBarHeight,
  getTitleBarHeight,
  getNavBarHeight,
  getLeftIconLeft,
} from '@/utils/system.js'
defineProps({
  title: {
    type: String,
    default: '标题',
  },
})
const onSearch = () => {
  uni.navigateTo({
    url: '/pages/search/search',
  })
}
</script>

<style lang="scss" scoped>
.layout {
  .navbar {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 10;
    background: linear-gradient(to bottom, transparent, #fff 400rpx),
      linear-gradient(to right, #beecd8 20%, #f4e2d8);
    .statusBar {
    }
    .titleBar {
      padding: 0 30rpx;
      display: flex;
      align-items: center;
      .title {
        font-size: 40rpx;
        font-weight: 700;
        color: $text-font-color-1;
      }
      .search {
        width: 220rpx;
        height: 50rpx;
        border-radius: 60rpx;
        background: rgba(255, 255, 255, 0.4);
        border: 1px solid #fff;
        margin-left: 30rpx;
        color: #999;
        font-size: 28rpx;
        display: flex;
        align-items: center;
        .icon {
          margin-left: 5rpx;
        }
        .text {
          padding-left: 10rpx;
        }
      }
    }
  }
}
</style>
