// pages/MyPost/home2/home2.js
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

    TabCur: 0, // 当前Tab的索引
    PageCur:'AllPost' ,   // 当前页面
    scrollLeft:0,
    tabtitle:['全部','待接单','进行中','已完成','已取消']

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
      var $id = e.currentTarget.dataset.id 
      if($id==0){
        this.setData({
          PageCur:'AllPost'
        })
      }
      else if($id==1){
        this.setData({
          PageCur:'WaitingToReceive'
        })
      }
      else if($id==2){
        this.setData({
          PageCur:'InProgress'
        })
      }
      else if($id==3){
        this.setData({
          PageCur:'Completed'
        })
      }
      else{
        this.setData({
          PageCur:'Canceled'
        })
      }
    },

  }
})
