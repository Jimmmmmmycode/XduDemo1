const db = wx.cloud.database({})
const app = getApp()
const $ = db.command.aggregate
const _ = db.command
var util = require("../../utils/util.js")
Component({

  data: {
    messagelist:[],
  },
  attached: function () {
    var that =this
    this.setData({
      messagelist:[],
    })
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
      _id: {
        orderId:'$orderId',
        receiverId:'$receiverId',
      },
      // 每组有一个 avgSales 字段，其值是组内所有记录的 sales 字段的平均值
      lastmassage: $.first('$textContent'),
      posterId: $.first('$posterId'),
      sendTime: $.first('$sendTime')
    }).sort({
      sendTime:-1
    })
    .end()
    .then(
      res=>{
        console.log(res)
        var tmp = res
        for(let i =0;i<res.list.length;i++){
          console.log(app.globalData.openid==res.list[i]["posterId"]?res.list[i]["_id"]["receiverId"]:res.list[i]["posterId"])
          db.collection("user").where({
            _openid:(app.globalData.openid==res.list[i]["posterId"]?res.list[i]["_id"]["receiverId"]:res.list[i]["posterId"])
          }).get({
            success: function(res) {
              var now=that.data.messagelist.length
              // console.log(i)
              console.log(res.data)
              // res.data 是包含以上定义的两条记录的数组
              tmp.list[i].nickName=res.data[0]["nickName"]
              tmp.list[i].avatarUrl=res.data[0]["avatarUrl"]
              tmp.list[i].sendTime=util.formatTime(tmp.list[i]["sendTime"])
              tmp.list[i].lastmassage=(tmp.list[i].lastmassage==null?"[image]":tmp.list[i].lastmassage)
              // console.log(tmp)
              that.data.messagelist[i]=tmp.list[i]
              console.log(that.data.messagelist)
              that.setData({
                // messagelist:that.data.messagelist.concat(tmp.list[i])
                messagelist:that.data.messagelist
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
  methods: {
    // 这里是一个自定义方法
    navigateToRoom:function(event){
      var data=event.currentTarget.dataset
      console.log(event.currentTarget.dataset)
      wx.navigateTo({
        url: '../Chatlist/room/room?orderid='.concat(data.orderid,"&posterid=",data.posterid,"&receiverid=",data.receiverid),
      })
    },
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
  }
})