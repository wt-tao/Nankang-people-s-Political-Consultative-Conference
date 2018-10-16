// pages/lvzhi/lvzhi.js
let app = getApp()
var host = app.globalData.HOST;
Page({

  /**
   * 页面的初始数据
   */
  data: {
   uid:'',
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
        id: 18
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
    wx.getStorage({
      //获取数据的key
      key: 'data',
      success: function (res) {
        that.setData({
          uid: res.data.ID,
        })
      }
    })

    // wx.getStorage({
    //   //获取数据的key
    //   key: 'storage',
    //   success: function (res) {
    //     var id = res.data.ID
    //     that.setData({
    //       uid: res.data.ID,
    //     })
    //   }
    // })
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
  * 调研提案
  */
  proposal: function () {
    new app.WeToast();
    if (this.data.uid == 0) {
      this.wetoast.toast({
        title: '没有你的委员信息无法进入提案',
        duration: 1000
      })
    } else {
      wx.navigateTo({
        url: '../lvzhi/proposal/proposal'
      })
    }
  },

  /**
  * 履职鉴评
  */
  review: function () {
    new app.WeToast();
    if (this.data.uid == 0) {
      this.wetoast.toast({
        title: '没有你的委员信息无法进入鉴评',
        duration: 1000
      })
    }else{
     wx.navigateTo({
      url: '../lvzhi/review/review'
   })
  }
  },

  /**
  * 民意直通
  */

  through: function () {
    new app.WeToast();
    var uid = this.data.uid;
    if (this.data.uid == 0) {
      this.wetoast.toast({
        title: '没有你的委员信息无法进入参加记录',
        duration: 1000
      })
    } else {
      wx.navigateTo({
        url: '../lvzhi/through/through'
      })
    }
  },
})