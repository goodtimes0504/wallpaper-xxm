<template>
  <view class="homeLayout pageBg">
    <view class="banner">
      <swiper
        indicator-dots
        indicator-color="rgba(255,255,255,0.5)"
        indicator-active-color="#fff"
        autoplay
        circular
      >
        <swiper-item>
          <image src="../../common/images/banner1.jpg" alt="" mode="widthFix" />
        </swiper-item>
        <swiper-item>
          <image src="../../common/images/banner2.jpg" alt="" mode="widthFix" />
        </swiper-item>
        <swiper-item>
          <image src="../../common/images/banner3.jpg" alt="" mode="widthFix" />
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
          <swiper-item
            >文字内容1文字内容1文字内容1文字内容1文字内容1文字内容1文字内容1文字内容1文字内容1文字内容1</swiper-item
          >
          <swiper-item
            >文字内容2文字内容2文字内容2文字内容2文字内容2文字内容2文字内容2文字内容2文字内容2文字内容2</swiper-item
          >
          <swiper-item
            >文字内容3文字内容3文字内容3文字内容3文字内容3文字内容3文字内容3文字内容3文字内容3文字内容3</swiper-item
          >
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
          <view class="box" v-for="item in 8" :key="item">
            <image
              src="../../common/images/preview_small.webp"
              alt=""
              mode="aspectFill"
            />
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="theme">
      <common-title>
        <template #left>专题精选</template>
        <template #right>
          <navigator url="" class="more"> More+ </navigator>
        </template>
      </common-title>
      <view class="content">
        <theme-item v-for="item in 8" :key="item"></theme-item>
        <theme-item :isMore="true"></theme-item>
      </view>
    </view>
  </view>
</template>

<script setup></script>

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
        image {
          width: 100%;
          height: 100%;
          border-radius: 20rpx;
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
