// miniprogram/pages/searchlist/searchlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchlist:[],
    searchshow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection("searchs").where({
      "value":options.kw
    }).get().then(res=>{
      if (res.data.length == 0) {
        this.setData({
          searchshow:true
        })
      }else{
        this.setData({
          searchshow:false,
          searchlist:res.data
        })
      }
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