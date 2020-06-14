
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
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://w.wallhaven.cc/full/6k/wallhaven-6k3oox.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://w.wallhaven.cc/full/r2/wallhaven-r2ze21.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://w.wallhaven.cc/full/ox/wallhaven-oxv6gl.png'
    }, 
  ],

     // 主页按钮的矢量图标路径及属性，id决定了后面navigate到哪个页面
     // 绑定到wx:for后面
    imgIcons:[
      {
        id:1,
        url:'../../images/post.png',
        title:'发布求助'
      },
    ]

  },

 

  

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击滑动框中的图片时进入图片详情页
  goDetail(e) {
    wx.navigateTo({
      url: '../pages/detail/detail',
    })  
  },


  //button的跳转功能集合，由id来进行条件判断决定跳转到哪个页面
  gofunction(e){
      var $id=e.currentTarget.dataset.id;
      console.log($id)
      // id为1时，跳转到我要发布的页面 IWanToPost
      if($id==1) {
        wx.navigateTo({
        url: '../IWanToPost/IWanToPost'
      })
    }
  
      // 后面有其他按钮在这里继续添加


  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  }


  }
})
