// pages/zhixun/moreComment/moreComment.js
var app = getApp()
var host = app.globalData.HOST;
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    title: "正在加载数据...",
    LmID:'',
    NewID:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
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
      id: id,
      lmid: lmid
    })
    wx.request({
      url: host + '/api/GuestBook/',
      data: {
        id,
        mid: 145,
        pageIndex: 1,
        pageSize:7,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        for (var i in res.data) {
          var id = res.data[i].NewsID
          var lmid = res.data[i].LmID
          var n = res.data[i].Time
          var time = n.replace("T", "\n");
          res.data[i].Time = time

        }
        that.setData({
          comment: res.data,
          LmID: lmid,
          NewID: id,

        })
      }
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
    var that = this
    var id = this.data.NewID;
    var lmid = this.data.LmID;
    setTimeout(function () {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            nickName: res.userInfo.nickName,
            head: res.userInfo.avatarUrl
          })
        }
      })
      that.setData({
        id: id,
        lmid: lmid
      })
      wx.request({
        url: host + '/api/GuestBook/',
        data: {
          id,
          mid: lmid,
          pageIndex: 1,
          pageSize: 30,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          for (var i in res.data) {
            var n = res.data[i].Time
            var time = n.replace("T", "\n");
            res.data[i].Time = time
          }
          that.setData({
            comment: res.data,
            title:true
          })
        }
      })
    }, 100)
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})