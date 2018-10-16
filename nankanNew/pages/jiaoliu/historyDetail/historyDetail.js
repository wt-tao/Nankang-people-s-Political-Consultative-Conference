var WxParse = require('../../../wxParse/wxParse.js');
let app = getApp();
var host = app.globalData.HOST;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    list: '',
    view: '',
    title: '',
    lmid: '',
    nickName:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     new app.WeToast();
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
          url: host+"/api/News",
          data: {
            id: id
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var da = res.data.Content;
            WxParse.wxParse('da', 'html', da, that, 5)
            var n = res.data.Time;
            var time = n.replace("T", "\t");
            res.data.Time = time
            var lmid = res.data.LmID;
            var news = "news";
            wx.request({

              url: host+'/api/PrevNext',
              data: {
                tabName: news,
                lmID: lmid,
                time: n
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                that.setData({
                  page: res.data
                })
              }
            }),
              that.setData({
                list: res.data,
                lmid: res.data.LmID,
                id: res.data.ID,
                title: res.data.Title,
                view: res.data.Views
              })
          }
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

  /**
    * 点赞
    */
  parise: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var view = this.data.list.Views;
    var nickName = this.data.nickName;
    wx.request({
      method: 'PUT',
      url: host + '/api/News/' + id + '?name=' + nickName,
      data: {
      },
      success: function (res) {
        if (res.data == -1) {
          that.wetoast.toast({
            title: '已经点赞过',
            duration: 1000,
          })
        } else {
          that.setData({
            view: res.data
          })
          that.wetoast.toast({
            title: '点赞成功',
            duration: 1000,
          })
        }
      },
    })
  },
  /**
    * 评论
    */
  comment: function (e) {
    var id = this.data.id;
    var title = this.data.title;
    var lmid = this.data.lmid;
    wx.navigateTo({
      url: '../../zhixun/comment/comment?id=' + id + '&title=' + title + '&lmid=' + lmid
    })
  },

  /**
   * 上一篇
   */
  Prev: function (e) {
    var id = e.currentTarget.id;
    if (id == 0) {
      wx.showToast({
        title: '没有上一条',
      })
    } else {
      wx.navigateTo({
        url: '../historyDetail/historyDetail?id=' + id
      })
    }
  },
  /**
  * 下一篇
  */
  Next: function (e) {
    var id = e.currentTarget.id;
    if (id == 0) {
      wx.showToast({
        title: '已是最后一条',
      })
    } else {
      wx.navigateTo({
        url: '../historyDetail/historyDetail?id=' + id
      })
    }
  }
})