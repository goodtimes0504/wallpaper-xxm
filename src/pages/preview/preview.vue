<template>
  <view class="preview">
    <swiper circular>
      <swiper-item v-for="item in 5" :key="item">
        <image src="../../common/images/preview1.jpg" mode="aspectFill" />
      </swiper-item>
    </swiper>
    <view class="mask">
      <view class="goBack"></view>
      <view class="count"></view>
    </view>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100vh;
  swiper {
    width: 100%;
    height: 100%;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
