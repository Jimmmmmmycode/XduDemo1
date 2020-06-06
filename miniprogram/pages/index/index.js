//index.js
const app = getApp()

Page({
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://w.wallhaven.cc/full/6k/wallhaven-6k3oox.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://w.wallhaven.cc/full/r2/wallhaven-r2ze21.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://w.wallhaven.cc/full/ox/wallhaven-oxv6gl.png'
    }, 
  ],

     // 主页按钮的矢量图标路径及属性，id决定了后面navigate到哪个页面
     // 绑定到wx:for后面
    imgIcons:[
      {
        id:1,
        url:'../../images/post.png',
        title:'发布求助'
      },
      
      {
        id:2,
        url:'../../images/plaza.png',
        title:'求助广场'
      } , 
      {
        id:3,
        url:'../../images/plaza.png',
        title:'我的求助'
      }
    ]
  },
  
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

  // 点击滑动框中的图片时进入图片详情页
  goDetail(e) {
    wx.navigateTo({
      url: '../pages/detail/detail',
    })  
  },


  //button的跳转功能集合，由id来进行条件判断决定跳转到哪个页面
  gofunction(e){
      var $id=e.currentTarget.dataset.id;
      console.log($id)
      // id为1时，跳转到我要发布的页面 IWanToPost
      if($id==1)wx.navigateTo({
        url: '../IWanToPost/IWanToPost'
      })
      // id为2时，跳转到任务广场页面
      if($id==2) wx.navigateTo({
        url:'../HelpPlaza/HelpPlaza',
      })


      // 后面有其他按钮在这里继续添加


  },


  // 页面初次加载时候执行的操作

  onLoad: function() {
    
  },




   // 下面这些函数在这个页面用不上,但可能在其他页面会用上
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
  }
})
