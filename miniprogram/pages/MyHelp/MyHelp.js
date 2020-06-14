// miniprogram/pages/MyHelp/MyHelp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    PageCur:'MyPost', // 当前tab指向页面
    scrollLeft:0,
    tab1:['我的发布','我的接单']
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    
    var $id=e.currentTarget.dataset.id
    if($id==0){ // id为0时,选择我的发布tab
      this.setData({
        PageCur:'MyPost'
      })
    }
    else{    // id为1时,选择我的接单tab
      this.setData({
        PageCur:'MyTask'
      })
    }
   


  },







  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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