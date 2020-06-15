// miniprogram/pages/IWanToPost/IWanToPost.js
const app = getApp()
const db = wx.cloud.database() // 获取数据库引用
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-6-4', // 截止日期
    time: '00:00',  // 截止时间
    sexpicker: ['男', '女', '男女皆可'],
    index:2, // sexpicker的索引
    require_sex:'',
    imgList: [],  // 图片
    title:null,   //标题
    detail:null,  //细节
    payment:null , //金额,
    postselfinfo:false,  // 是否上传个人信息
    allowEveryone:false,
    helpid: '',
    fileIDs : [] ,
    postTime:''  // 发布时间
  },


  // 获取标题输入到pagedata
  inputtitle(e){
    this.setData({
      title: e.detail.value       //  e - bindinput返回事件，在detail.value中存有当前输入文本框的值 
    })
    console.log(e.detail.value)
  },

  // 获取详细内容输入到 page data
  inputdetail(e){
    this.setData({
      detail: e.detail.value
    })
    console.log(e.detail.value)

  },

  // 获取支付金额输入到 page data
  inputpayment(e){
    this.setData({
      payment:e.detail.value
    })
  },

  // 设置页面数据date
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })

    console.log(this.data.date)
  },


  // 设置页面数据 time
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
    
  },

  // 设置页面数据sexindex和require_sex
  SexChange(e){
    this.setData({
      index: e.detail.value,
    })
    this.setData({
      require_sex :this.data.sexpicker[e.detail.value]
    })
    console.log(this.data.index)
    console.log(this.data.require_sex)
  },




  // 选择上传图片
  ChooseImage(){

    // 调用wx api
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length!= 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },


  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  DelImg(e) {
    wx.showModal({
      title: '图片删除',
      content: '确定要删除这张图片吗',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  // 
  changeReceiveprivacy(e){

    if(this.data.allowEveryone){
      this.setData({
        allowEveryone:false
      })
    }else{
      this.setData({
        allowEveryone:true
      })
     }
     console.log(this.data.allowEveryone)
     

  },

  /*  绑定保存按钮的bindtap属性,点击后将用户本次的填写保存到本地缓存  */
  onSave:function() {

  },




  
  /* 绑定提交按钮的bindtap属性，点击后向云数据库和云存储上传所有必要的数据 */
  onPost: function() {
    if( this.data.detail==null||this.data.payment==null||this.data.title==null ) {
      wx.showModal({
        title:'请完善信息' 
      })
      return;
    }

    
    var that = this 
    var TIME = util.formatTime(new Date());
    that.setData({
      postTime: TIME,
    });
    console.log(TIME)
    that.setData({
      require_sex:this.data.sexpicker[this.data.index]
    })

    wx.showLoading({
      title: '提交中',
    })

    
    const promiseArr = [] 
    for(let i=0;i<that.data.imgList.length;i++){
        let filePath = that.data.imgList[i]
        let suffix =  /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
        //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
      promiseArr.push(new Promise((reslove,reject)=>{
        // 云存储接口
        wx.cloud.uploadFile({
          cloudPath: "help_info_img/"+ app.globalData.openid+"/"+new Date().getTime() + suffix,
          filePath: filePath, // 文件路径
        }).then(res => {
          // get resource ID
          console.log(res.fileID)
          that.setData({
            fileIDs: that.data.fileIDs.concat(res.fileID)
          })
          reslove()
        }).catch(error => {
          console.log(error)
        })
      }))
    }
    Promise.all(promiseArr).then(res=>{
    db.collection('help_info').add({
      data:{
        postTime:that.data.postTime, // 发布时间
        title:that.data.title, 
        detail:that.data.detail,
        payment:that.data.payment,
        date:that.data.date, // 截止日期
        time:that.data.time,  // 截止时间
        require_sex:that.data.require_sex,  
        receivestatus: false , // 是否已接单
        finishstatus: false , // 是否已完成
        cancelstatus: false , // 是否已取消
        allowEveryone:that.data.allowEveryone , //是否同意所有人接单
        avatarurl: app.globalData.userInfo.avatarUrl, // 用户头像
        nickname:app.globalData.userInfo.nickName,// 用户名
        fileIDs:that.data.fileIDs, // 用户上传的图片
        receiverid:''
      }    
      ,
      success:res=>{
        console.log('[数据库][新增记录]成功，记录 _id: ', res._id)
      },
      fail:err=>{  
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  }).then(res=>{
    wx.hideLoading()
    wx.showToast({
      title: '新增记录成功',
    })
    console.log(res)
    wx.navigateBack()
  })
    .catch(error=>{
      console.log(error)
    })
    

  
     
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