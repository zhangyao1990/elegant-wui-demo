<template>
  <page-wraper :is-show-tabbar="true" :is-show-navbar="false">
    <view class="p-24rpx">
      <view class="mb-20rpx">首页</view>
      <view>
        <wui-button type="primary" @click="test">测试按钮</wui-button>
      </view>
    </view>
    <wui-gap height="0" safe-area-bottom></wui-gap>
  </page-wraper>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import useAuthStore from '@/store/modules/useAuthStore'

const router = useRouter()
const test = () => {
  router.push('/pages_index/plan/index')
}
const authStore = useAuthStore()
onShow(() => {
  authStore.getUserInfo()
})
</script>

<style lang="scss" scoped></style>
