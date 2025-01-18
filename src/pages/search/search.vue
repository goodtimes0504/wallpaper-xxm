<template>
  <view class="searchLayout">
    <view class="search">
      <uni-search-bar
        @confirm="onSearch"
        @cancel="onClear"
        @clear="onClear"
        focus
        placeholder="搜索"
        v-model="queryParams.keyword"
      >
      </uni-search-bar>
    </view>

    <view v-if="classList.length <= 0 || noData">
      <view class="history" v-if="historySearch.length">
        <view class="topTitle">
          <view class="text">最近搜索</view>
          <view class="icon" @click="removeHistory">
            <uni-icons type="trash" size="25"></uni-icons>
          </view>
        </view>
        <view class="tabs">
          <view
            class="tab"
            v-for="tab in historySearch"
            :key="tab"
            @click="clickTab(tab)"
            >{{ tab }}</view
          >
        </view>
      </view>

      <view class="recommend">
        <view class="topTitle">
          <view class="text">热门搜索</view>
        </view>
        <view class="tabs">
          <view
            class="tab"
            v-for="tab in recommendList"
            :key="tab"
            @click="clickTab(tab)"
            >{{ tab }}</view
          >
        </view>
      </view>
    </view>

    <view class="noSearch" v-if="noSearch">
      <uv-empty mode="search"></uv-empty>
    </view>

    <view v-else>
      <view class="list">
        <navigator
          :url="`/pages/preview/preview?id=${item._id}`"
          class="item"
          v-for="item in classList"
          :key="item._id"
        >
          <image :src="item.smallPicurl" mode="aspectFill"></image>
        </navigator>
      </view>
      <view class="loadingLayout" v-if="noData || classList.length"
        ><uni-load-more :status="noData ? 'noMore' : 'loading'"
      /></view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onUnload, onReachBottom } from '@dcloudio/uni-app'
import { getSearchDataAPI } from '@/api/apis'
import Classlist from '../classlist/classlist.vue'
//查询参数
const queryParams = ref({
  pageNum: 1,
  pageSize: 12,
  keyword: '',
})

//搜索历史词
const historySearch = ref(uni.getStorageSync('historySearch') || [])

//热门搜索词
const recommendList = ref(['美女', '帅哥', '宠物', '卡通'])

//没有更多
const noData = ref(false)
//没有搜索结果
const noSearch = ref(false)
// 初始化数据
const initParams = () => {
  queryParams.value.pageNum = 1
  queryParams.value.keyword = ''
  classList.value = []
  noData.value = false
  noSearch.value = false
}

//搜索结果列表
const classList = ref([
  // {
  //   _id: 123123,
  //   smallPicurl:
  //     'https://mp-0cb878b7-99ec-44ea-8246-12b123304b05.cdn.bspapp.com/xxmBizhi/20231102/1698905562410_0_small.webp',
  // },
])

//点击搜索
const onSearch = async () => {
  classList.value = []
  queryParams.value.pageNum = 1
  queryParams.value.keyword = queryParams.value.keyword.trim()
  if (queryParams.value.keyword === '') {
    return
  }
  uni.showLoading()

  historySearch.value = Array.from(
    new Set([queryParams.value.keyword, ...historySearch.value])
  ).slice(0, 10)
  uni.setStorageSync('historySearch', historySearch.value)
  await searchData()
  uni.hideLoading()
}

//点击清除按钮
const onClear = () => {
  initParams()
}

//点击标签进行搜索
const clickTab = value => {
  initParams()
  queryParams.value.keyword = value
  // searchData()
  onSearch()
}

//点击清空搜索记录
const removeHistory = () => {
  uni.showModal({
    title: '是否清空历史搜索？',
    success: res => {
      if (res.confirm) {
        console.log('确认删除')
        historySearch.value = []
        uni.setStorageSync('historySearch', historySearch.value)
      } else if (res.cancel) {
        console.log('取消删除')
      }
    },
  })
}

//触底加载更多
onReachBottom(() => {
  queryParams.value.pageNum++
  searchData()
})

//关闭有页面
onUnload(() => {
  uni.removeStorageSync('storageClassList')
})

const searchData = async () => {
  const res = await getSearchDataAPI(queryParams.value)
  console.log(res)
  classList.value = [...classList.value, ...res.data.data]
  uni.setStorageSync('storageClassList', classList.value)
  if (res.data.data.length < queryParams.value.pageSize) {
    noData.value = true
  }
  // if(res.data.data.length === 0&&queryParams.value.pageNum===1)
  if (res.data.data.length === 0 && classList.value.length === 0) {
    noSearch.value = true
  }
}
</script>

<style lang="scss" scoped>
.searchLayout {
  .search {
    padding: 0 10rpx;
  }
  .topTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32rpx;
    color: #999;
  }
  .history {
    padding: 30rpx;
  }
  .recommend {
    padding: 30rpx;
  }
  .tabs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 20rpx;
    .tab {
      background: #f4f4f4;
      font-size: 28rpx;
      color: #333;
      padding: 10rpx 28rpx;
      border-radius: 50rpx;
      margin-right: 20rpx;
      margin-top: 20rpx;
    }
  }
  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rpx;
    padding: 20rpx 5rpx;
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
