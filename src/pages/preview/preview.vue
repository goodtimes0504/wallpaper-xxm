<template>
  <view class="preview">
    <swiper
      class="preview-swiper"
      circular
      :current="currentIndex"
      @change="changeSwiper"
    >
      <swiper-item v-for="(item, index) in newClassList" :key="item._id">
        <image
          class="preview-image"
          @click="maskChange"
          :src="item.picurl"
          mode="aspectFill"
          v-if="seenList.includes(index)"
        />
      </swiper-item>
    </swiper>
    <!-- {{ seenList }} -->
    <view class="mask" v-show="maskStatus">
      <view
        class="goBack"
        :style="{ top: getStatusBarHeight() + 'px' }"
        @click="goBack"
      >
        <uni-icons type="back" color="#fff" size="24" />
      </view>
      <view class="count"
        >{{ currentIndex + 1 }} / {{ newClassList.length }}
      </view>
      <view class="time">
        <uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
      </view>
      <view class="date">
        <uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
      </view>
      <view class="footer">
        <view class="box" @click="clickInfo">
          <uni-icons type="info" size="28" />
          <view class="text">信息</view>
        </view>
        <view class="box" @click="clickScore">
          <uni-icons type="star" size="28" />
          <view class="text">{{ currentInfo.score }}分</view>
        </view>
        <view class="box" @click="clickDownload">
          <uni-icons type="download" size="28" />
          <view class="text">下载</view>
        </view>
      </view>
    </view>
    <uni-popup ref="infoPopup" type="bottom" :safe-area="false">
      <view class="infoPopup">
        <view class="popHeader">
          <view style="opacity: 0">xxx</view>
          <view class="title">壁纸信息</view>
          <view class="close" @click="infoPopup.close">
            <uni-icons type="closeempty" color="#999" size="18" />
          </view>
        </view>
        <scroll-view scroll-y>
          <view class="content">
            <view class="row">
              <view class="label">壁纸ID:</view>
              <text selectable="false" class="value">{{
                currentInfo._id
              }}</text>
            </view>
            <!-- <view class="row">
              <view class="label">分类:</view>
              <text selectable="false" class="value classname">明星美女</text>
            </view> -->
            <view class="row">
              <view class="label">发布者:</view>
              <text selectable="false" class="value">{{
                currentInfo.nickname
              }}</text>
            </view>
            <view class="row">
              <view class="label">评分:</view>
              <view selectable="false" class="value rateBox">
                <uni-rate readonly :value="currentInfo.score" />
                <text class="score">{{ currentInfo.score }}分</text>
              </view>
            </view>
            <view class="row">
              <view class="label">摘要:</view>
              <text selectable="false" class="value">{{
                currentInfo.description
              }}</text>
            </view>
            <view class="row">
              <view class="label">标签:</view>
              <view selectable="false" class="value tabs">
                <view
                  class="tab"
                  v-for="item in currentInfo.tabs"
                  :key="item"
                  >{{ item }}</view
                >
              </view>
            </view>
            <view class="copyright">
              声明：本图片来自用户投稿，非商业使用，用于免费学习交流；如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱xxxxx@qq.com；管理员会删除侵权壁纸，维护您的权益；
            </view>
          </view>
        </scroll-view>
      </view>
    </uni-popup>
    <uni-popup ref="scorePopup" type="center" @change="handlePopupChange">
      <view class="scorePopup">
        <view class="popHeader">
          <view style="opacity: 0">xxx</view>
          <view class="title">{{ isScore ? '已经评分过了' : '壁纸评分' }}</view>
          <view class="close" @click="scoreClose">
            <uni-icons type="closeempty" color="#999" size="18" />
          </view>
        </view>
        <view class="content">
          <uni-rate
            v-model="userScore"
            allowHalf
            :disabled="isScore"
            disabled-color="#ffca3e"
          />
          <text class="text">{{ userScore }}分</text>
        </view>
        <view class="footer">
          <button
            type="default"
            size="mini"
            plain
            :disabled="!userScore || isScore"
            @click="submitScore"
          >
            确认评分
          </button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { getStatusBarHeight } from '@/utils/system.js'
import { onLoad } from '@dcloudio/uni-app'
import { setupScoreAPI } from '@/api/apis'
// 看过的图放到数组里 和v-if搭配 不用每次都去请求数据
const seenList = ref([])
// 获取当前图片信息
const currentInfo = computed(() => {
  return newClassList.value[currentIndex.value]
})
// 获取当前大图id
const currentId = ref(null)
const currentIndex = ref(0)
onLoad(params => {
  if (params.id) {
    currentId.value = params.id
  } else {
    goBack()
  }
  currentIndex.value = newClassList.value.findIndex(item => {
    if (item._id === currentId.value) {
      return true
    }
  })
  seenListFn()
})
// 用户评分
const userScore = ref(0)
const isScore = ref(false)
// 返回
const goBack = () => {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    // 如果有历史页面，调用 navigateBack
    uni.navigateBack({
      success: () => {},
      fail: () => {
        uni.reLaunch({ url: '/pages/index/index' })
      },
    })
  } else {
    // 如果没有历史页面，直接跳转到首页
    uni.reLaunch({ url: '/pages/index/index' })
  }
}
// 读取localStorage里的数据
const newClassList = ref([])
const storageClassList = uni.getStorageSync('storageClassList')
newClassList.value = storageClassList.map(item => {
  return {
    ...item,
    picurl: item.smallPicurl.replace('_small.webp', '.jpg'),
  }
})
// 提交评分
const submitScore = () => {
  // console.log("提交评分", userScore.value)
  const { classid, _id: wallId } = currentInfo.value
  setupScoreAPI({ classid, wallId, userScore: userScore.value })
    .then(res => {
      newClassList.value[currentIndex.value].userScore = userScore.value
      uni.setStorageSync('storageClassList', newClassList.value)
      uni.showToast({
        title: '评分成功',
        icon: 'none',
      })
      scoreClose()
    })
    .catch(err => {
      console.log(err)
      uni.showToast({
        title: '评分失败',
        icon: 'none',
      })
      scoreClose()
    })
}
// 点击info弹窗
const infoPopup = ref(null)
const clickInfo = () => {
  infoPopup.value.open()
}
// 评分弹窗
const scorePopup = ref(null)
const clickScore = () => {
  if (currentInfo.value.userScore) {
    isScore.value = true
    userScore.value = currentInfo.value.userScore
  } else {
    userScore.value = currentInfo.value.score
  }
  scorePopup.value.open()
}
// 评分弹窗关闭
const scoreClose = () => {
  scorePopup.value.close()
  isScore.value = false
  userScore.value = 0
}
// 遮罩层状态
const maskStatus = ref(true)
const maskChange = () => {
  // scoreClose()
  maskStatus.value = !maskStatus.value
}
// 滑动事件
const changeSwiper = e => {
  // console.log(e)
  currentIndex.value = e.detail.current
  seenListFn()
}
const seenListFn = () => {
  seenList.value.push(
    currentIndex.value,
    currentIndex.value <= 0
      ? newClassList.value.length - 1
      : currentIndex.value - 1,
    currentIndex.value >= newClassList.value.length - 1
      ? 0
      : currentIndex.value + 1
  )
  seenList.value = Array.from(new Set(seenList.value))
}
// 监听弹窗状态变化
const handlePopupChange = e => {
  if (!e.show) {
    // 当弹窗关闭时
    isScore.value = false
  }
}
// 点击下载
const clickDownload = () => {
  // #ifdef H5
  uni.showModal({
    content: '请长按图片保存',
    showCancel: false,
  })
  // #endif
  // #ifndef H5
  uni.getImageInfo({
    src: currentInfo.value.picurl,
    success: res => {
      // console.log(res)
      uni.showLoading({
        title: '保存中',
      })
      uni.saveImageToPhotosAlbum({
        filePath: res.path,
        success: () => {
          uni.showToast({
            title: '保存成功',
            icon: 'none',
          })
        },
        fail: err => {
          console.log(err)
          if (err.errMsg === 'saveImageToPhotosAlbum:fail cancel') {
            uni.showToast({
              title: '您取消了保存',
              icon: 'none',
            })
            return
          } else if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
            uni.showModal({
              title: '提示',
              content: '需要授权才能保存到相册',
              success: res => {
                console.log(res)
                if (res.confirm) {
                  uni.openSetting({
                    success: res => {
                      if (res.authSetting['scope.writePhotosAlbum']) {
                        uni.showToast({
                          title: '获取授权成功',
                          icon: 'none',
                        })
                      } else {
                        uni.showToast({
                          title: '获取授权失败',
                          icon: 'none',
                        })
                      }
                    },
                  })
                }
              },
            })
          }
        },
        complete: () => {
          uni.hideLoading()
        },
      })
    },
    fail: err => {
      console.log(err)
    },
  })
  // uni.saveImageToPhotosAlbum({
  //   filePath: currentInfo.value.picurl,
  //   success: () => {
  //     uni.showToast({
  //       title: "保存成功",
  //       icon: "none",
  //     })
  //   },
  //   fail: () => {
  //     uni.showToast({
  //       title: "保存失败",
  //       icon: "none",
  //     })
  //   },
  // })
  // #endif
}
</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100vh;
  position: relative;

  .preview-swiper {
    width: 100%;
    height: 100%;

    .preview-image {
      width: 100%;
      height: 100%;
    }
  }

  .mask {
    & > view {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      // 居中 有多少内容就给多少宽度
      width: fit-content;
      color: #fff;
    }

    .goBack {
      width: 38px;
      height: 38px;
      background: rgba(0, 0, 0, 0.5);
      left: 30rpx;
      margin-left: 0;
      border-radius: 100px;
      top: 0;
      backdrop-filter: blur(10rpx);
      border: 1px solid rgba(255, 255, 255, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .count {
      top: 10vh;
      backdrop-filter: blur(20rpx);
      background: rgba(0, 0, 0, 0.5);
      font-size: 28rpx;
      border-radius: 40rpx;
      padding: 8rpx 28rpx;
    }

    .time {
      font-size: 140rpx;
      top: calc(10vh + 80rpx);
      font-weight: 100;
      line-height: 1em;
      text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
    }

    .date {
      font-size: 34rpx;
      top: calc(10vh + 230rpx);
      text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
    }

    .footer {
      background: rgba(255, 255, 255, 0.8);
      bottom: 10vh;
      width: 64vw;
      height: 120rpx;
      border-radius: 120rpx;
      color: #000;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(20rpx);

      .box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // 增加触碰区域
        padding: 2rpx 12rpx;

        .text {
          font-size: 26rpx;
          color: $text-font-color-2;
        }
      }
    }
  }

  .infoPopup {
    height: 100%;
    background: #fff;
    padding: 30rpx;
    border-radius: 30rpx 30rpx 0 0;
    overflow: hidden;

    scroll-view {
      max-height: 60vh;

      .content {
        .row {
          display: flex;

          padding: 16rpx 0;
          font-size: 32rpx;
          line-height: 1.7em;

          .label {
            color: $text-font-color-3;
            width: 140rpx;
            text-align: right;
            font-size: 30rpx;
          }

          .value {
            flex: 1;
            width: 0;
          }

          .rateBox {
            display: flex;
            align-items: center;

            .score {
              font-size: 26rpx;
              color: $text-font-color-3;
              padding-left: 20rpx;
            }
          }

          .tabs {
            display: flex;
            flex-wrap: wrap;

            .tab {
              border: 1px solid $brand-theme-color;
              color: $brand-theme-color;
              font-size: 22rpx;
              padding: 10rpx 30rpx;
              border-radius: 40rpx;
              line-height: 1em;
              margin: 4rpx 10rpx 10rpx 4rpx;
            }
          }

          .classname {
            color: $brand-theme-color;
          }
        }

        .copyright {
          font-size: 28rpx;
          padding: 20rpx;
          background-color: #e2e1e1;
          color: #666;
          border-radius: 10rpx;
          margin: 20rpx 0;
          line-height: 1.6rm;
        }
      }
    }
  }

  .popHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      color: $text-font-color-2;
      font-size: 26rpx;
    }

    .close {
      padding: 6rpx;
    }
  }

  .scorePopup {
    background: #fff;
    padding: 30rpx;
    width: 70vw;
    border-radius: 30rpx;
    overflow: hidden;

    .content {
      padding: 30rpx 0;
      display: flex;
      justify-content: center;
      align-items: center;

      .text {
        color: #ffca3e;
        padding-left: 10rpx;
        width: 80rpx;
        line-height: 1em;
        text-align: right;
      }
    }

    .footer {
      display: flex;
      padding: 10rpx 0;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
