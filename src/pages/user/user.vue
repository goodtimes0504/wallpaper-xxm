<template>
  <view class="userLayout pageBg">
    <view class="userInfo">
      <view class="avatar">
        <image src="../../static/images/xxmLogo.png" mode="aspectFill" />
      </view>
      <view class="ip">
        <text>IP: 192.168.1.1</text>
      </view>
      <view class="address">
        <text>来自于: 北京市海淀区</text>
      </view>
    </view>

    <view class="section">
      <view class="list">
        <navigator url="/pages/classlist/classlist" class="row">
          <view class="left">
            <uni-icons type="download-filled" size="20" />
            <view class="text">我的下载</view>
          </view>
          <view class="right">
            <view class="text">33</view>
            <uni-icons type="right" size="15" color="#aaa" />
          </view>
        </navigator>
        <navigator url="/pages/classlist/classlist" class="row">
          <view class="left">
            <uni-icons type="star-filled" size="20" />
            <view class="text">我的评分</view>
          </view>
          <view class="right">
            <view class="text">33</view>
            <uni-icons type="right" size="15" color="#aaa" />
          </view>
        </navigator>
        <view class="row">
          <view class="left">
            <uni-icons type="chatboxes-filled" size="20" />
            <view class="text">联系客服</view>
          </view>
          <view class="right">
            <uni-icons type="right" size="15" color="#aaa" />
          </view>
          <!-- #ifdef MP-WEIXIN -->
          <button class="contact">联系客服</button>
          <!-- #endif -->
          <!-- #ifndef MP-WEIXIN  -->
          <button @click="clickContact">拨打电话</button>
          <!-- #endif -->
        </view>
      </view>
    </view>
    <view class="section">
      <view class="list">
        <view class="row">
          <view class="left">
            <uni-icons type="notification-filled" size="20" />
            <view class="text">订阅更新</view>
          </view>
          <view class="right">
            <uni-icons type="right" size="15" color="#aaa" />
          </view>
        </view>
        <view class="row">
          <view class="left">
            <uni-icons type="flag-filled" size="20" />
            <view class="text">常见问题</view>
          </view>
          <view class="right">
            <uni-icons type="right" size="15" color="#aaa" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const clickContact = () => {
  uni.makePhoneCall({
    phoneNumber: '1234567890',
  })
}
</script>

<style lang="scss" scoped>
.userLayout {
  .userInfo {
    padding: 50rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .avatar {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      overflow: hidden;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .ip {
      font-size: 44rpx;
      color: #333;
      padding: 20rpx 0 5rpx;
    }
    .address {
      font-size: 28rpx;
      color: #aaa;
    }
  }
  .section {
    width: 690rpx;
    margin: 50rpx auto;
    border: 1px solid #eee;
    border-radius: 20rpx;
    box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.15);
    .list {
      .row {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: 0 30rpx;
        height: 100rpx;
        align-items: center;
        border-bottom: 1px solid #dfdfdf;
        background-color: #fff;
        &:last-child {
          border-bottom: none;
        }
        .left {
          display: flex;
          align-items: center;
          :deep(.uni-icons) {
            display: flex;
            justify-content: center;
            align-items: center;
            color: $brand-theme-color !important;
          }
          .text {
            padding-left: 20rpx;
            color: #666;
          }
        }
        .right {
          display: flex;
          align-items: center;
          .text {
            font-size: 28rpx;
            color: #aaa;
          }
        }
        button {
          position: absolute;
          left: 0;
          top: 0;
          height: 100rpx;
          width: 100%;
          opacity: 0;
        }
        :deep(a) {
          width: 100%;
          position: relative;
          display: flex;
          justify-content: space-between;
          height: 100rpx;
          align-items: center;
          border-bottom: 1px solid #dfdfdf;
          background-color: #fff;
        }
      }
    }
  }
}
</style>
