<template>
  <page-wraper>
    <view class="p-24rpx">
      <view class="mb-20rpx">这是一个测试页面1</view>
      <mp-html :content="content"></mp-html>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
const content = `
  <p>这是一段富文本</p>
`
</script>

<style lang="scss" scoped></style>
