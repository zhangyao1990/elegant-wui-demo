<template>
  <wui-config-provider :themeVars="themeVars">
    <!--    #ifndef H5-->
    <wui-navbar
      v-if="isShowNavbar"
      :safeAreaInsetTop="safeAreaInsetTop"
      :placeholder="navbarPlaceholder"
      :fixed="navbarFixed"
      :zIndex="navbarZIndex"
      :title="navigationBarTitleText"
      left-text="返回"
      right-text=""
      left-arrow
    >
      <template #capsule>
        <wui-navbar-capsule @back="handleBack" @back-home="handleBackHome" />
      </template>
    </wui-navbar>
    <!--    #endif-->
    <wui-notify />
    <wui-toast />
    <wui-message-box />
    <privacy-popup></privacy-popup>
    <view class="page-wraper" :class="{ paddingBottom: isShowTabbar }" @click="closeOutside" :style="rootStyle">
      <slot></slot>
      <wui-gap height="0" v-if="safeAreaInsetBottom" safe-area-bottom></wui-gap>
    </view>
    <wui-tabbar v-if="isShowTabbar" fixed :model-value="tabbarStore.getActive.name" @change="handleChange" bordered safeAreaInsetBottom placeholder>
      <wui-tabbar-item name="index" :value="tabbarStore.getTabbarItemValue('index')" title="首页">
        <template #icon="{ active }">
          <image class="w-40rpx h-40rpx mb-5rpx" :src="getSpecImgUrl(active ? 'isdm_my_service_current.png' : 'isdm_my_service.png')"></image>
        </template>
      </wui-tabbar-item>
      <wui-tabbar-item name="mine" :value="tabbarStore.getTabbarItemValue('mine')" title="个人中心">
        <template #icon="{ active }">
          <image class="w-40rpx h-40rpx mb-5rpx" :src="getSpecImgUrl(active ? 'isdm_mine_center_current.png' : 'isdm_mine_center.png')"></image>
        </template>
      </wui-tabbar-item>
    </wui-tabbar>
  </wui-config-provider>
</template>
<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { ConfigProviderThemeVars, useQueue } from 'elegant-wui-uni'
import { getSpecImgUrl } from '@/config/app'
import useTabbarStore from '@/store/modules/useTabbarStore'
import { computed, type CSSProperties } from 'vue'
import { addUnit, objToStyle } from 'elegant-wui-uni/components/common/util'
const { statusBarHeight } = uni.getSystemInfoSync()
const router: any = useRouter()
const route: any = useRoute()
const { closeOutside } = useQueue()
const props = defineProps({
  isShowTabbar: {
    type: Boolean,
    default: false
  },
  isShowNavbar: {
    type: Boolean,
    default: true
  },
  safeAreaInsetTop: {
    type: Boolean,
    default: true
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  navbarPlaceholder: {
    type: Boolean,
    default: true
  },
  navbarFixed: {
    type: Boolean,
    default: true
  },
  navbarZIndex: {
    type: Number,
    default: 1000
  },
  navbarTitle: {
    type: String,
    default: ''
  }
})
const navigationBarTitleText = computed(() => {
  if (props.navbarTitle) {
    return props.navbarTitle
  } else {
    return route?.style?.navigationBarTitleText
  }
})
const tabbarStore = useTabbarStore()
const themeVars = reactive<ConfigProviderThemeVars>({
  colorTheme: '#007aff'
})

function handleChange({ value }) {
  tabbarStore.setTabbarItemActive(value)
  router.pushTab({ name: value })
}
function handleBack() {
  router.back()
}

function handleBackHome() {
  router.replaceAll({ path: '/pages/index/index' })
}
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (!props.isShowNavbar) {
    style['padding-top'] = addUnit(statusBarHeight || 0)
  }
  return `${objToStyle(style)};`
})
onShow(() => {
  // #ifdef APP-PLUS
  uni.hideTabBar()
  // #endif
})
</script>
<style lang="scss" scoped>
@import 'elegant-wui-uni/components/common/abstracts/variable';
.wui-theme-dark {
  .page-wraper {
    background: #000;
  }
}
.paddingBottom {
  min-height: calc(100vh - var(--window-top) - $-tabbar-height - constant(safe-area-inset-bottom));
  min-height: calc(100vh - var(--window-top) - $-tabbar-height - env(safe-area-inset-bottom));
  // #ifdef H5
  min-height: calc(100vh - var(--window-top) - $-tabbar-height);
  // #endif
  box-sizing: border-box;
}
</style>
