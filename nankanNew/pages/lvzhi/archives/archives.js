// pages/lvzhi/archives/archives.js
var page = 1;
var pageSize = 50;
var lmid = 19;
let app = getApp();
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
    var that = this;
    new app.WeToast();
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000,
      success: function () {
        wx.request({
          url: host+"/api/Product",
          data: {
            pageIndex: page,
            pageSize: pageSize,
            lmid: lmid
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
 * 刷新
 */
  refresh: function () {
    var that = this;
    wx.request({
      url: host + "/api/Product",
      data: {
        pageIndex: page,
        pageSize: pageSize,
        lmid: lmid
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
  * 查询
  */
  serach: function (e) {
    var serach = e.detail.value
    var that = this;
    wx.request({
      method: 'POST',
      url: host + "/api/Product?lmid=19&value=" + serach,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.length == 0) {
          that.wetoast.toast({
            title: '查询为空',
            duration: 1000,
          })
          that.setData({
            list: res.data
          })
        } else {
          that.setData({
            list: res.data
          })
        }
      }
    })
  },

   /**
   * 档案详情
   */
  acitivityDetail: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../archivesDetail/archivesDetail?id='+id,

    })
  }
})