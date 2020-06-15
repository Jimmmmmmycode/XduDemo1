// pages/MyHelp2/MyHelp.js
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

    TabCur: 0,
    PageCur:'MyPost', // 当前tab指向页面
    scrollLeft:0,
    tab1:['我的发布','我的接单']

  },

  /**
   * 组件的方法列表
   */
  methods: {
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

  }
})
