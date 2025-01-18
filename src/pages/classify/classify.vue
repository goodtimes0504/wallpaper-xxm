<template>
  <view class="classLayout pageBg">
    <custom-nav-bar title="分类"></custom-nav-bar>
    <view class="classify">
      <theme-item
        v-for="item in classifyList"
        :item="item"
        :key="item._id"
      ></theme-item>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { getClassifyListAPI } from '../../api/apis'
const classifyList = ref([])
const getClassify = async () => {
  const res = await getClassifyListAPI({
    pageSize: 20,
  })
  classifyList.value = res.data.data
}
getClassify()
</script>

<style lang="scss" scoped>
.classLayout {
  .classify {
    padding: 30rpx;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15rpx;
  }
}
</style>
