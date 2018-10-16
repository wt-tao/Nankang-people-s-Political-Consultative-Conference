// pages/lvzhi/activityDetail/activityDetail.js
var app = getApp()
var host = app.globalData.HOST;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  id:'',
  title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'data',
      success: function (res) {
        that.setData({
          uid: res.data.ID,
          name: res.data.Name
        })
      }
    })
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000,
      success: function () {
        wx.request({
          url: host +"api/Activity",
          data: {
            id: id,
            mid:149
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
              id: res.data.ID,
              title:res.data.Name
            })
          }
        })
        wx.request({
          method: 'GET',
          url: host + 'api/User/' + id,
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            that.setData({
              listStatus: res.data,
              status:res.data.SignStata,
            })
          }
        })
      }
    })
  },

})
