// miniprogram/pages/SelfReceiveDetail/SelfReceiveDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display:'',
    basicsList: [{
      icon: 'usefullfill',
      name: '已发布'
    }, {
      icon: 'radioboxfill',
      name: '待接单'
    }, {
      icon: 'roundclosefill',
      name: '进行中'
    }, {
      icon: 'roundcheckfill',
      name: '已完成'
    }, ],
    
    basicsList2: [ {
      icon: 'usefullfill',
      name: '已发布'
    }, {
      icon: 'radioboxfill',
      name: '待派单'
    }, {
      icon: 'roundclosefill',
      name: '进行中'
    }, {
      icon: 'roundcheckfill',
      name: '已完成'
    }, ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  ViewImage:function(e){
    
    console.log(e.currentTarget.dataset)
    wx.previewImage({
      urls: this.data.display.fileIDs,
      current: e.currentTarget.dataset.url
    });
  },
  onLoad: function (options) {
    var detail_info = JSON.parse(options.detail_info)
    this.setData(
      {
        display:detail_info
      }
    )
    console.log(this.data.display)
    console.log("页面信息传递成功")

  },

  
  // 跳转到聊天页面(彤哥写)
  // 发布者openid - display._openid 
   // 发布者姓名 - display.nickname
   // 发布者头像 - display.avatarUrl
   // 权限 -用于决定哪个按钮显示 -display.allowEveryone
  navigateToChat:function(e){
    wx.navigateTo({
      url: '',
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})