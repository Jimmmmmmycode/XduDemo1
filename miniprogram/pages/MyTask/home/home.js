// pages/MyTask/home2/home.js
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
    PageCur:'AllReceive' ,   // 当前页面
    scrollLeft:0,
    tabtitle:['全部','进行中','已完成','已取消']

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
          PageCur:'AllReceive'
        })
      }
      else if($id==1){
        this.setData({
          PageCur:'InProgress'
        })
      }
      else if($id==2){
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
