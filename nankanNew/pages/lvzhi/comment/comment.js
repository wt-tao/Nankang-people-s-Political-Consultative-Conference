// pages/zhixun/comment/comment.js
var app = getApp()
var host = app.globalData.HOST;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title: '',
    nickName: '',
    lmid: '',
    head: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    var title = options.title
    var lmid = options.lmid;

    wx.getUserInfo({
      success: function (res) {
        that.setData({
          nickName: res.userInfo.nickName,
          head: res.userInfo.avatarUrl
        })
      }
    })
    that.setData({
      title: title,
      id: id,
      lmid: lmid
    })
  },



  /**
  * 提交评论
  */
  formSubmit: function (e) {
    new app.WeToast();
    var Title = this.data.title;
    var Name = this.data.nickName;
    var HeadImgUrl = this.data.head;
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = date.getMonth() + 1 + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = (date.getHours() + ":");
    var m = (date.getMinutes() + ":");
    var s = (date.getSeconds());
    var Time = Y + M + D + "T" + h + m + s;
    var Content = e.detail.value.Content
    var LmID = this.data.lmid;
    var NewsID = this.data.id;

    wx.request({
      method: 'POST',
      url: host + '/api/GuestBook?mid=145',
      data: {
        Name: Name,
        HeadImageUrl: HeadImgUrl,
        Title: Title,
        Time: Time,
        NewsID: NewsID,
        LmID: LmID,
        Content: Content,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: '正在审核...',
          icon: 'loading',
          duration: 2000,
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

  },

})