// miniprogram/pages/HelpDetail/HelpDetail.js
const app = getApp()
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display:'',
    orderid:'',
    checkreceive:'',
    checkcancel:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var detail_info = JSON.parse(options.detail_info)
    this.setData(
      {
        display:detail_info
      }
    )
    this.setData({
      orderid:this.data.display['_id']
    })
    console.log(this.data.orderid)
    console.log(this.data.display)
    console.log("页面信息传递成功")
  },

  ViewImage:function(e){
    
    console.log(e.currentTarget.dataset)
    wx.previewImage({
      urls: this.data.display.fileIDs,
      current: e.currentTarget.dataset.url
    });
  },





  receiveorder:function(e){


    // 检查是否在接自己的单
    if(this.data.display._openid==app.globalData.openid){
      wx.showModal({
        cancelColor: 'cancelColor',
        title:'提示',
        content:'你个sb , 不能接自己的单哦',
        showCancel:false,
        confirmText:"我知道了",

      })
      return; 
    }
    // 检查这个单是否被接或取消
    db.collection('help_info').doc(this.data.orderid).get().then(
      res=>{
        if(res.receivestatus==true){
          wx.showModal({
            cancelColor: 'cancelColor',
            title:'你手怎么那么慢！'
          })
          return;
        }
        if(res.cancelstatus==true){
          wx.showModal({
            cancelColor: 'cancelColor',
            title:'对方取消啦!'
          })
          return;
        }
      }
    )
    wx.cloud.callFunction({
      // 云函数名称
      name: 'ReceiveOrder',
      // 传给云函数的参数
      data: {
        
        orderid:this.data.orderid,
        receivernickname: app.globalData.userInfo.nickName,
        receiveravatarurl: app.globalData.userInfo.avatarUrl
      },
    })
    .then(res => {
      console.log(res.result)
      wx.navigateTo({
        url: '../Chatlist/room/room?orderid='.concat(this.data.display._id,"&posterid=",this.data.display._openid,"&receiverid=",app.globalData.openid),
      })
    })
    .catch(console.error)

  },


  // 跳转到聊天页面(彤哥写)

  // 发布者openid - display._openid 
   // 发布者姓名 - display.nickname
   // 发布者头像 - display.avatarUrl
   // 权限 -用于决定哪个按钮显示 -display.allowEveryone
   navigateToChat:function(e){
   // 调用云函数判断 
   // 调用云函数更改receivetrue
    wx.navigateTo({
      url: '../Chatlist/room/room?orderid='.concat(this.data.display._id,"&posterid=",this.data.display._openid,"&receiverid=",app.globalData.openid),
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