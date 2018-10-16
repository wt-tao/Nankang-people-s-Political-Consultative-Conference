// pages/zhixun/zhixun.js
var app = getApp();
var host = app.globalData.HOST;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    uid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar();
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'data',
      success: function (res) {
      }
    })
    wx.request({
      url: host + "api/Link",
      data: {
        id: 17
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
   * 南康要闻
   */
   news: function () {
     var lmid = 18;
     wx.navigateTo({
      url: '../zhixun/news/news?lmid='+lmid
    })
  },

   /**
    * 理论观点
    */
  theory: function () {
    var lmid = 24;
    var id = this.data.uid;
    console.log(id);
    new app.WeToast();
    if (this.data.uid == 0) {
      this.wetoast.toast({
        title: '没有你的委员信息无法进入提案',
        duration: 1000
      })
    } else {
      wx.navigateTo({
        url: '../zhixun/theory/theory?lmid=' + lmid
      })
    }
   },

    /**
    * 动态公告
    */
  dynamic:function(){
    var lmid = 142;
    wx.navigateTo({
      url: '../zhixun/dynamic/dynamic?lmid=' + lmid
    })
  },

})