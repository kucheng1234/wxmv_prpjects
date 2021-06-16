const request = require("../../utils/request")

// miniprogram/pages/channel/channel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateAll:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    request.get("/apiv3/cate/getList").then(res=>{
      this.setData({
        cateAll : res.data.data
      })
      wx.hideLoading()
    })
  },
jumpList(event){
  let cateid = event.currentTarget.dataset.cateid;
    wx.navigateTo({
      url: '/pages/list/list?cateid='+cateid,
    })
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
    // this.getTabBar获取自定义组件实例
    // setData()设置自定义组件实例的数据index
    this.getTabBar().setData({
      index:1
    })
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