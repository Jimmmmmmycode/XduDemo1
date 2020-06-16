// pages/MyTask/AllReceive/AllReceive.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    display:''
  },

  /**
   * 组件的方法列表
   */
  attached(){
    var that = this 
    console.log('对全局变量获得open_id成功',that.data.user_open_id)
    console.log('开始从数据库获取数据,一次限制获取10条')
    const db=wx.cloud.database()
    db.collection('help_info').limit(10).where({
      receivestatus:true
      }).where({
        receiverid:getApp().globalData.openid
      }).get({
      success:res=>{
        console.log('success')
        console.log(res.data)
        that.setData({
          display:res.data
        })
        console.log(that.data.display)}
      ,
        fail:err=>{
          console.log(err)
        }
    })
  },
  methods: {

    goforDetail(e){
      var that = this
      var index = e.currentTarget.id   // 每个点击事件绑定一个id，这个id值就是这条信息在display数组中的index
      var detail_info = JSON.stringify(that.data.display[index]) // 将要传递的json对象先转换成字符串（url不能直接传JSON对象)  
      wx.navigateTo({
        url: '../SelfReceiveDetail/SelfReceiveDetail?detail_info='+detail_info,
      })
    },

    

  }
})
