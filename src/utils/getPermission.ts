export const getPermission = ({ code, name }) => {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success: (res) => {
        if (res.authSetting[code] === false) {
          uni.showModal({
            title: `获取${name}失败`,
            content: `获取${name}失败，请在【右上角】-小程序【设置】项中，将【${name}】开启。`,
            confirmText: '去设置',
            confirmColor: '#FA550F',
            cancelColor: '取消',
            success(res) {
              if (res.confirm) {
                uni.openSetting({
                  success(settingRes) {
                    if (settingRes.authSetting[code] === true) {
                      resolve(true)
                    } else {
                      console.warn('用户未打开权限', name, code)
                      reject()
                    }
                  }
                })
              } else {
                reject()
              }
            },
            fail() {
              reject()
            }
          })
        } else {
          resolve(true)
        }
      },
      fail() {
        reject()
      }
    })
  })
}
