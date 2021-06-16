// custom-tab-bar/index.js
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
    monus:[
      {
        title:'发现',
        url:'/pages/index/index'
      },
      {
        title:'频道',
        url:'/pages/channel/channel'
      },
      {
        title:"我的",
        url:"/pages/me/me"
      }
    ],
    index:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jump(event){
      let url = event.currentTarget.dataset.url;
      // 注释这一段,应该在页面里面设置index的值
      // for(var i in this.data.monus){
      //   if(url === this.data.monus[i].url){
      //     this.setData({
      //       index:i
      //     })
      //   }
      // }
      wx.switchTab({
        url: url,
      })
    }
  }
})
