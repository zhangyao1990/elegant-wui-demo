export interface TabbarItem {
  name: string
  value: number | null
  active: boolean
}
const useTabbarStore = defineStore(
  // 唯一ID
  'tabbar',
  () => {
    const tabbarItems = ref<TabbarItem[]>([
      { name: 'index', value: null, active: true },
      { name: 'mine', value: null, active: false }
    ])
    const getTabbarItems = computed(() => {
      return tabbarItems.value
    })
    const getActive = computed(() => {
      const item = tabbarItems.value.find((item) => item.active)
      return item || tabbarItems.value[0]
    })
    const getTabbarItemValue = computed(() => {
      return (name: string) => {
        const item = tabbarItems.value.find((item) => item.name === name)
        return item && item.value ? item.value : null
      }
    })

    function setTabbarItem(name: string, value: number) {
      const tabbarItem = tabbarItems.value.find((item) => item.name === name)
      if (tabbarItem) {
        tabbarItem.value = value
      }
    }
    function setTabbarItemActive(name: string) {
      tabbarItems.value.forEach((item) => {
        item.active = item.name === name
      })
    }

    return {
      tabbarItems,
      getTabbarItems,
      getActive,
      getTabbarItemValue,
      setTabbarItem,
      setTabbarItemActive
    }
  }
)

export default useTabbarStore
