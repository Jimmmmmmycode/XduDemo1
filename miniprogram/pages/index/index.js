//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession:false,
    requestResult: '',
    indicatorDots:true,
    autoplay: true,
    indicatorColor: '#fedb00',
    interval: 2000,
    duration: 400,
    autoForce: true,
    keyword:'',
    imgUrls:[
      {
        id:1,
        url:'/images/1.jpg'

      },
      {
        id:2,
        url:'/images/2.jpg'
      }
    ],
    imgUrlsOne:[
      {
        id:1,
        url:'/images/up.png',
        title:'我要发布'
      },
      {
        id:2,
        url:'/images/up1.png',
        title:'任务广场'
      }
    ]
  },
  
  goSearch(e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  goDetail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },

  goSeaver(e){
      var $id=e.currentTarget.dataset.id;
      console.log($id)
      if($id==1)wx.navigateTo({
        url: '/pages/publish_help_info/publish_help_info',
      })
      else wx.navigateTo({
        url: '/pages/plaza/plaza',
      })
  },
  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  onLoad: function (options) {
    that = this;
  },
  //input框失焦
  blursearch: function (event) {
    that.setData({
      autoFocus: false,
    });
  },
  //input框聚焦
  inputfocus: function (e) {
    
  },
  //联想
  inputsearch: function (event) {
    // 如果输入框有内容，展示联想
    if (event.detail.value) {
      that.setData({
        keyWord: event.detail.value,
        autoFocus: true
      });
    } else {
      
    }
  }, 
  // 搜索按钮
  searchBtn: function () {
    if (that.data.keyWord) {
      
    } else {
      wx.showToast({
        title: '请输入美食名',
        icon: 'none',
        duration: 1500
      })
    }
  },
  //键盘搜索
  goSearch: function (event) {
    if (that.data.keyWord) {
      
    } else {
      wx.showToast({
        title: '请输入美食名',
        icon: 'none',
        duration: 1500
      })
    }
  },
  //清空输入框
  cancelword: function () {
    that.setData({
      keyWord: ''
    });
  },
})
