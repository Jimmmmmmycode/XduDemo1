// pages/Myinfo/Myinfo.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },

  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    avatarUrl:'', // 用户头像
    username:''   // 用户名
    
  },

  /**
   * 组件的方法列表
   */
  attached() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.setData({
                  avatarUrl : res.userInfo.avatarUrl,
                  username :  res.userInfo.nickName
              })
              console.log(this.data.avatarUrl)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  methods: {
    
  }
})
