// pages/index/chatlist/chatlist.js
const db = wx.cloud.database({})
const app = getApp()
const $ = db.command.aggregate
const _ = db.command
var util = require("../../utils/util.js")
Page({
  data: {
    messagelist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    db.collection('chatroom').aggregate()
    .match(_.or([
      {
        posterId:app.globalData.openid},
      {
        receiverId:app.globalData.openid
      }
    ])
    )
    .sort({
      sendTime:-1
    })
    .group({
      // 按 category 字段分组
      _id: '$orderId',
      // 每组有一个 avgSales 字段，其值是组内所有记录的 sales 字段的平均值
      lastmassage: $.first('$textContent'),
      posterId: $.first('$posterId'),
      receiverId: $.first('$receiverId'),
      sendTime: $.first('$sendTime')
    }).sort({
      sendTime:-1
    })
    .end()
    .then(
      res=>{
        // console.log(res.list[0]["posterId"])
        var tmp = res
        for(var i =0;i<res.list.length;i++){
          db.collection("user").where({
            _openid:app.globalData.openid==res.list[i]["posterId"]?res.list[i]["receiverId"]:res.list[i]["posterId"]
          }).get({
            success: function(res) {
              var now=that.data.messagelist.length
              // console.log(now)
              // console.log(res.data)
              // res.data 是包含以上定义的两条记录的数组
              tmp.list[now].nickName=res.data[0]["nickName"]
              tmp.list[now].avatarUrl=res.data[0]["avatarUrl"]
              tmp.list[now].sendTime=util.formatTime(tmp.list[now]["sendTime"])
              tmp.list[now].lastmassage=(tmp.list[now].lastmassage==null?"[image]":tmp.list[now].lastmassage)
              // console.log(tmp)
              that.setData({
                messagelist:that.data.messagelist.concat(tmp.list[now])
              })
              console.log(that.data.messagelist)
            }
          }
          )
        }
        // console.log(app.globalData.avatarUrl)
        // console.log(this.data.messagelist)
      }
    )
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  navigateToRoom:function(event){
    var data=event.currentTarget.dataset
    console.log(event.currentTarget.dataset)
    wx.navigateTo({
      url: '../../room/room?orderid='.concat(data.orderid,"&posterid=",data.posterid,"&receiverid=",data.receiverid),
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
    // ListTouch触摸开始
    ListTouchStart(e) {
      this.setData({
        ListTouchStart: e.touches[0].pageX
      })
    },
  
    // ListTouch计算方向
    ListTouchMove(e) {
      this.setData({
        ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
      })
    },
  
    // ListTouch计算滚动
    ListTouchEnd(e) {
      if (this.data.ListTouchDirection =='left'){
        this.setData({
          modalName: e.currentTarget.dataset.target
        })
      } else {
        this.setData({
          modalName: null
        })
      }
      this.setData({
        ListTouchDirection: null
      })
    },
})