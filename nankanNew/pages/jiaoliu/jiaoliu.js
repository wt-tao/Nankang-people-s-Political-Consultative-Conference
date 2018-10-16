var app = getApp();
var host = app.globalData.HOST;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar();
    var that = this;
    wx.request({
      url: host + "api/Link",
      data: {
        id: 19
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          list: res.data
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
 * 政协讲堂
 */

  lecture: function () {
    var lmid = 153;
    wx.navigateTo({
      url: '../jiaoliu/lecture/lecture?lmid=' + lmid,
    })
  },


  /**
  * 南康史终
  */
  history: function () {
    var lmid = 154;
    wx.navigateTo({
      url: '../jiaoliu/history/history?lmid=' + lmid,
    })
  },

  /**
   * 他先之石
   */
  stone: function () {
    var lmid = 155;
    wx.navigateTo({
      url: '../jiaoliu/stone/stone?lmid=' + lmid,
    })
  },

  main: function () {
    wx.redirectTo({
      url: '../main/main',
    })
  },
  zhixun: function () {
    wx.redirectTo({
      url: '../zhixun/zhixun',
    })
  },
  lvzhi: function () {
    wx.redirectTo({
      url: '../lvzhi/lvzhi',
    })
  },
  jiaoliu: function () {
    wx.redirectTo({
      url: '../jiaoliu/jiaoliu',
    })
  }


})