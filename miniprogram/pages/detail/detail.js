const request = require("../../utils/request");

// miniprogram/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: [],
    video: [],
    show: true,
    id: null,
    title: null
  },

  getfav() {
    wx.cloud.database().collection('users').get().then(res => {
      let id = res.data[0]._id;
      wx.cloud.database().collection("users").where({
        "_id": id
      }).get().then(re => {
        let favs = this.data.post;
        wx.cloud.database().collection("favs").add({
          data: favs,
        }).then(() => {
          this.setData({
            show: false
          })
          wx.showToast({
            title: '成功加入收藏',
          })
        })
      })
    }).catch(err=>{
      wx.showToast({
        title: '请先登录哦',
      })
    })
  },
  cancel() {
    wx.cloud.database().collection("favs").get().then(res => {
      let id = this.data.id;
      wx.cloud.database().collection("favs").where({
        "postid": id
      }).remove().then(re => {
        wx.showToast({
          title: '取消收藏成功',
        })
        this.setData({
          show: true
        })
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vid = options.vid;
    this.setData({
      id: vid
    })
    wx.showLoading({
      title: '正在加载',
    })
    request.get("/apiv3/post/view?postid=" + vid).then(res => {
      this.setData({
        title: res.data.data.title,
        post: res.data.data,
        video: res.data.data.relate_video
      })
      wx.hideLoading()
    })
    wx.cloud.database().collection("favs").where({
      "postid": vid
    }).get().then(res => {
      if (res.data.length != 0) {
        this.setData({
          show: false
        })
      } else {
        this.setData({
          show: true
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
    return {
      title: this.data.title
    }
  },

  onShareTimeline() {
    return {
      title: this.data.title
    }
  }
})