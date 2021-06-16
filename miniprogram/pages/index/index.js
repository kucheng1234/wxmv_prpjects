const request = require("../../utils/request");// 引入require.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    today:[],
    posts:[],
    lastid:0,
  },
  jumpsearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    request.get('/apiv3/index/index').then(res=>{
      // 轮播图
      this.setData({
        banner:res.data.data.banner
      })
      // 今日推荐
      let today = res.data.data.today.list.map(d=>{
        let min = parseInt( d.duration/60)
        min = min < 10 ? "0" + min : min
        let sec = parseFloat( d.duration%60)
        sec = sec < 10 ? "0" + sec : sec
        d.duration = min + ":" + sec
        return d;
      })
      this.setData({
        today:res.data.data.today
      })
      // 每日推荐
      let posts = res.data.data.posts.list.map(d=>{
        let min = parseInt( d.duration/60)
        min = min < 10 ? "0" + min : min
        let sec = parseFloat( d.duration%60)
        sec = sec < 10 ? "0" + sec : sec
        d.duration = min + ":" + sec
        return d;
      })
      this.setData({
        posts:posts
      })
      this.setData({
        lastid:res.data.data.posts.lastid
      })
    }).catch(err=>{
      wx.showToast({
        title: '网络加载错误',
      })
      console.log(err);
    }).finally(re=>{
      wx.hideLoading();
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
      index:0
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
    wx.showLoading({
      title: '正在加载',
    })
    request.get("/apiv3/index/getIndexPosts/lastid/" + this.data.lastid).then(res=>{
      let posts = this.data.posts;
      let list = res.data.data.list;
      list = list.map(d=>{
        let min = parseInt( d.duration/60)
        min = min < 10 ? "0" + min : min
        let sec = parseFloat( d.duration%60)
        sec = sec < 10 ? "0" + sec : sec
        d.duration = min + ":" + sec
        return d;
      })
      posts = posts.concat(list)
      // console.log(this.data.posts);
      // console.log();
      this.setData({
        posts:posts,
        lastid:res.data.data.lastid
      })
      wx.hideLoading();
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})