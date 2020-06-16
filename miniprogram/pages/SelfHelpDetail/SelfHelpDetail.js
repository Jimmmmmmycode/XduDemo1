// miniprogram/pages/SelfHelpDetail/SelfHelpDetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display:'',
    receiverinfo:'',
    basicsList: [{
      icon: 'edit',
      name: '已发布'
    }, {
      icon: 'loading',
      name: '待接单'
    }, {
      icon: 'creative',
      name: '进行中'
    }, {
      icon: 'check',
      name: '已完成'
    }, ],
    
    basicsList2: [ {
      icon: 'edit',
      name: '已发布'
    }, {
      icon: 'loading',
      name: '待派单'
    }, {
      icon: 'creative',
      name: '进行中'
    }, {
      icon: 'check',
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  basicsSteps(){
    this.setData({
      basics: this.data.basics == this.data.basicsList.length - 1 ? 0 : this.data.basics + 1
    })
  },

   // 跳转到聊天页面(彤哥写)
   // 发布者openid - display._openid 
   // 发布者姓名 - display.nickname
   // 发布者头像 - display.avatarUrl
   // 权限 -用于决定哪个按钮显示 -display.allowEveryone
  navigateToChat:function(e){

      wx.navigateTo({
        url: '../Chatlist/room/room?orderid='.concat(this.data.display._id,"&posterid=",app.globalData.openid,"&receiverid=",this.data.display.receiverid)
      })
  },


  //重新发布
  repost:function(e){

  },
  
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