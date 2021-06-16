// miniprogram/pages/me/me.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getUserProfile() {
    wx.getUserProfile({
      desc: '获取用户的信息',
      success: (res) => {
        let userInfo = res.userInfo
        this.setData({
          userInfo: userInfo
        })
        wx.cloud.database().collection("users").add({
          data: userInfo,
        })
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },
  delete() {
    wx.cloud.database().collection('users').get().then(res => {
      let id = res.data[0]._id;
      wx.cloud.database().collection("users").where({
        "_id": id
      }).remove().then(re => {
        wx.showToast({
          title: '退出成功',
        })
        this.getusers()
      })
    })
  },
  getusers() {
    wx.cloud.database().collection('users').get().then(res => {
      if (res.data.length == 0) {
        this.setData({
          userInfo: null
        })
      } else {
        this.setData({
          userInfo: res.data[0],
        })
      }
    })
  },

  navToFav() {
    wx.cloud.database().collection("users").get().then(res => {
      if (this.data.userInfo == null) {
        wx.showToast({
          title: '请先登录',
        })
      } else {
        wx.navigateTo({
          url: '/pages/fav/fav',
        })
      }
    })
    // wx.navigateTo({
    //   url: '/pages/fav/fav',
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getusers()
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
    this.getTabBar().setData({
      index: 2
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