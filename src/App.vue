<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import useUpdateManager from '@/hooks/useUpdateManager'
useUpdateManager()
onLaunch(async (options: any) => {
  console.log('App options', options)
  console.log('App Launch')
})
onShow(() => {
  console.log('App onShow')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
