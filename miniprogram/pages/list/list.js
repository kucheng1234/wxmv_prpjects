const request = require("../../utils/request");

// miniprogram/pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    cateid:0,
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    let cateid = options.cateid
    if (cateid) {
      request.get("/apiv3/post/getPostInCate",{
        p:1,
        size:10,
        cateid:cateid
      }).then(res=>{
        let list = res.data.data.map(d=>{
          let min = parseInt( d.duration/60)
          min = min > 10 ? min : "0" + min
          let sec = parseInt( d.duration%60)
          sec = sec > 10 ? sec : "0" + sec
          d.duration = min + ":" + sec
          return d;
        })
        this.setData({
          list:res.data.data,
          cateid:cateid
        })
        wx.hideLoading()
      })
    }else if(cateid=="Album"){
      request.get("/apiv3/post/view?postid=60849").then(res=>{
        let list = res.data.data.map(d=>{
          let min = parseInt( d.duration/60)
          min = min > 10 ? min : "0" + min
          let sec = parseInt( d.duration%60)
          sec = sec > 10 ? sec : "0" + sec
          d.duration = min + ":" + sec
          return d;
        })
        this.setData({
          list:res.data.data,
          cateid:cateid
        })
        wx.hideLoading()
      })
    }
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
    let p = ++this.data.page;
    wx.showLoading({
      title: '正在加载',
    })
    request.get("/apiv3/post/getPostInCate",{
      p:p,
      size:10,
      cateid:this.data.cateid
    }).then(res=>{
      let list = this.data.list;
      let newData = res.data.data
      let lists = newData.map(d=>{
        let min = parseInt( d.duration/60)
        min = min > 10 ? min : "0" + min
        let sec = parseInt( d.duration%60)
        sec = sec > 10 ? sec : "0" + sec
        d.duration = min + ":" + sec
        return d;
      })
      list = list.concat(lists)
      this.setData({
        list:list
      })
      wx.hideLoading()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})