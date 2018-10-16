// pages/lvzhi/handleDetail/handleDetail.js
var app = getApp();
var host = app.globalData.HOST;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title: '',
    nickName: '',
    lmid: 145,
    head: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          nickName: res.userInfo.nickName,
          head: res.userInfo.avatarUrl
        })
      }
    })
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000,
      success: function () {
        wx.request({
          url: host + "/api/News",
          data: {
            id: id
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var n = res.data.Time;
            var time = n.replace("T", "\t");
            res.data.Time = time
            that.setData({
             list:res.data,
             title: res.data.Title,
             id:res.data.ID,
            })
          }
        })
        wx.request({
          url: host + '/api/GuestBook/',
          data: {
            id,
            mid: 145,
            pageIndex: 1,
            pageSize: 1000,
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
            })
          }
        })    
      }
    })         
  },

 /**
  * 刷新 
  */
  refresh: function () {
   var id = this.data.id;
   var that = this;
    wx.request({
      url: host + '/api/GuestBook/',
      data: {
        id,
        mid: 145,
        pageIndex: 1,
        pageSize: 1000,
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
        })
      }
    })       
  },
   


  /**
  * 提交评论
  */
  formSubmit: function (e) {
    var that = this;
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
    var Time = Y + M + D +"\t"+h + m + s;
    var Content = e.detail.value.Content
    var NewsID = this.data.id;
    wx.request({
      method: 'POST',
      url: host + 'api/GuestBook/1?lmid=' + 145,
      data: {
        Name: Name,
        HeadImageUrl: HeadImgUrl,
        Title: Title,
        Time: Time,
        NewsID: NewsID,
        Content: Content,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
        })
        that.setData({
          Content: ''
        })
        that.refresh();  
      }   
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})