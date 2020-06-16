const app = getApp()
const db = wx.cloud.database({})
Page({
  data:{
    verifylist:[],
    picfile:[],
    nickName:"",
    avatarUrl:"",
    showUrl:"",
    currentIndex:null,
  },
  showModal(e) {
    console.log()
    this.setData({
      modalName: e.currentTarget.dataset.target,
      showUrl: this.data.picfile[e.currentTarget.dataset.index],
      currentIndex: e.currentTarget.dataset.index
    })
  },
  pass(e) {
    var that = this
    this.setData({
      modalName: null
    })
    db.collection('user').where({_id:this.data.verifylist[this.data.currentIndex]['_id']}).update({
      // data 传入需要局部更新的数据
      data: {
        verify: true
      },
      success: function(res) {
        that.data.verifylist.splice(that.data.currentIndex,1)
        console.log("all right")
        that.setData({
          verifylist: that.data.verifylist
        })
      }
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  onLoad:function(){},
  onShow:function(){
    // console.log(app.globalData.nickName)
    var that = this
    db.collection('user').where({
      verify: false,
    })
    .get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          verifylist:res.data
        })
        // console.log(that.data.verifylist.length)
        for(var i =0;i<that.data.verifylist.length;i++){

          wx.cloud.downloadFile({
            fileID: that.data.verifylist[i]['picID'], // 文件 ID
            success: res => {
              // 返回临时文件路径
              console.log(res.tempFilePath)
              that.setData({
                picfile:that.data.picfile.concat(res.tempFilePath)
              })
            },
            fail: console.error
          })
        }
      }
    })
  }
})