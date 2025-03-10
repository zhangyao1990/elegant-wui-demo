<template>
  <page-wraper :is-show-tabbar="true" :is-show-navbar="false">
    <view class="relative p-24rpx">
      <view class="mb-20rpx">个人中心</view>
      <view>
        <wui-button type="primary" @click="test">测试按钮</wui-button>
      </view>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
const router = useRouter()
const test = () => {
  router.push('/pages_mine/patient/index')
}
</script>
<style lang="scss"></style>
