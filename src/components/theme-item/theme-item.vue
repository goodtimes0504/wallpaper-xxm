<template>
  <view class="themeItem">
    <navigator url="/pages/classlist/classlist" class="box" v-if="!isMore">
      <image
        class="img"
        src="../../common/images/classify1.jpg"
        mode="aspectFill"
      />
      <view class="tab">3天前更新</view>
      <view class="mask">明星美女</view>
    </navigator>
    <!-- 如果不加open-type无法跳转到tabbar 如果加了reLaunch可以 但是无法返回 所以用switchTab -->

    <navigator
      url="/pages/classify/classify"
      open-type="switchTab"
      class="box more"
      v-else
    >
      <image class="img" src="../../common/images/more.jpg" mode="aspectFill" />
      <view class="mask">
        <uni-icons type="more-filled" color="#fff" size="40" />
        <view class="text">更多</view>
      </view>
    </navigator>
  </view>
</template>

<script setup>
defineProps({
  isMore: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.themeItem {
  .box {
    height: 340rpx;
    border-radius: 15rpx;
    overflow: hidden;
    position: relative;
    .img {
      width: 100%;
      height: 100%;
    }
    .mask {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 70rpx;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      font-size: 30rpx;
      text-align: center;
      line-height: 70rpx;
      // 磨砂效果
      backdrop-filter: blur(20rpx);
      font-weight: 600;
      // border-radius: 0 0 15rpx 15rpx;
    }
    .tab {
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(250, 129, 90, 0.7);
      backdrop-filter: blur(20rpx);
      color: #fff;
      font-size: 22rpx;
      padding: 6rpx 16rpx;
      border-radius: 0 0 15rpx 0;
      transform: scale(0.9);
      transform-origin: left top;
    }
  }
  .box.more {
    .mask {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .text {
      line-height: 28rpx;
      font-size: 28rpx;
      font-weight: 600;
    }
  }
}
</style>
