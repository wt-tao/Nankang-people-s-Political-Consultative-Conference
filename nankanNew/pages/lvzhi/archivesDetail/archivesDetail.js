// pages/lvzhi/archivesDetail/archivesDetail.js
var app = getApp();
var host = app.globalData.HOST;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that = this;
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000,
      success: function () {
        wx.request({
          method:'POST',
          url: host+"/api/Product/"+id,
          data: {
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var n = res.data.Time
            var Date = n.substring(0, 10);
            res.data.Time = Date
            that.setData({
              list: res.data,
            })
          }
        })
      }
    })
  },
})