<template>
  <view class="classlist">
    <view class="loadingLayout" v-if="classList.length === 0 && !noData">
      <uni-load-more status="loading"></uni-load-more>
    </view>
    <view class="content">
      <navigator
        :url="`/pages/preview/preview?id=${item._id}`"
        class="item"
        v-for="item in classList"
        :key="item._id"
      >
        <image :src="item.smallPicurl" mode="aspectFill" />
      </navigator>
    </view>
    <!-- 下面这个只有当本地列表有数据的时候或者接口没有更多数据了的时候才显示 -->
    <!-- 也可以定义一个变量 只要上面那个出现 下面这个就不出现就好了 -->
    <view class="loadingLayout" v-if="classList.length > 0 || noData">
      <uni-load-more :status="noData ? 'no-more' : 'loading'"></uni-load-more>
    </view>
    <view class="safe-area-inset-bottom"></view>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getClassListAPI, getHistoryListAPI } from '../../api/apis'
import { onReachBottom } from '@dcloudio/uni-app'
const queryParams = { pageNum: 1, pageSize: 15 }
const classList = ref([])
const noData = ref(false)
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { gotoHome } from '../../utils/common'
// 分享给好友
onShareAppMessage(e => {
  return {
    title: '李成的壁纸库123',
    path: '/pages/classlist/classlist?id=' + queryParams.classid,
  }
})
// 分享到朋友圈
onShareTimeline(() => {
  return {
    title: '李成的壁纸库',
    imageUrl: 'https://tea.qingnian8.com/api/bizhi/banner/1.jpg',
  }
})

onLoad(params => {
  // if (!params.id) {
  //   gotoHome()
  //   return
  // }
  if (params.type) queryParams.type = params.type
  if (params.id) queryParams.classid = params.id
  uni.setNavigationBarTitle({
    title: params.name,
  })
  getClassList(queryParams)
})
const getClassList = async queryParams => {
  let res
  try {
    if (queryParams.classid) res = await getClassListAPI(queryParams)
    if (queryParams.type) res = await getHistoryListAPI(queryParams)
    classList.value = [...classList.value, ...res.data.data]
    if (res.data.data.length === 0) {
      noData.value = true
    }
    uni.setStorageSync('storageClassList', classList.value)
  } catch (e) {
    noData.value = true
  }
}
//创建节流函数
const throttle = (fn, delay) => {
  let timer = null
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay)
    }
  }
}

const getListWithThrottle = throttle(getClassList, 2000)

// 触底加载更多
onReachBottom(() => {
  console.log('触底加载更多')
  queryParams.pageNum++
  // 另外一个写法比较简洁 throttle(getClassList, 1000)(queryParams)
  getListWithThrottle(queryParams)
})
</script>

<style lang="scss" scoped>
.classlist {
  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rpx;
    padding: 5rpx;
    .item {
      height: 440rpx;
      image {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>
