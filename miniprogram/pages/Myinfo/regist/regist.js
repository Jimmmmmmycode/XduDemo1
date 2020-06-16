const app = getApp()
const db = wx.cloud.database({})
Page({
  data:{
    files: ["/images/jia.jpg"],
    errtext: "null",
    title: "",
    picID:"",
    close: false
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  
  onLoad:function(){
  },
  formSubmit: function (e) {
    // console.log(e.detail.value['name'])
    if(e.detail.value['name'].length==0){
      this.setData({
        modalName: 'Modal',
        errtext: '请输入姓名',
        title: "认证失败"
      })
      return
    }
    if(e.detail.value['name'].length==0){
      this.setData({
        modalName: 'Modal',
        errtext: '请输入学号',
        title: "认证失败"
      })
      return
    }
    if(this.data.files[0]=="../../../image/jia.jpg"){
      this.setData({
        modalName: 'Modal',
        errtext: '请输入图片',
        title: "认证失败"
      })
      return
    }
    var that = this
    db.collection('user').where({
      openid: app.globalData.openid,
    })
    .get({
      success: function(res) {
       if(res.data[0]){
        console.log(res.data[0])
        that.setData({
          modalName: 'Modal',
          errtext: '无法重复认证',
          title: "已提交认证",
          close:true
        })
       }
       else{
        //  console.log( app.globalData.openid+'.png',)
          wx.cloud.uploadFile({
          cloudPath: app.globalData.openid+'.png', // 上传至云端的路径
          filePath: that.data.files[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            db.collection('user').add({
              // data 字段表示需新增的 JSON 数据
              data: {
                name : e.detail.value['name'],
                code : e.detail.value['code'],
                picID : res.fileID,
                avatarUrl:app.globalData.userInfo.avatarUrl,
                nickName:app.globalData.userInfo.nickName,
                mymoney:0,
                myorder:0,
                myreceive:0,
                verify : false
              },
              success: function(res) {
                that.setData({
                  modalName: 'Modal',
                  errtext: '请等待审核',
                  title: "提交成功"
                })
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log(res)
              }
            })
          },
          fail: console.error
        })
       }
      }
    })

  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: res.tempFilePaths
        }
        );
        // console.log(that.data.files.slice(1))
      }})
  },
  previewImg: function (e) {
    //获取当前图片的下标
   var index = e.currentTarget.dataset.index;
   var imgs = this.data.files;
   wx.previewImage({
    current: imgs[index],
    urls: imgs
   })
  }
})