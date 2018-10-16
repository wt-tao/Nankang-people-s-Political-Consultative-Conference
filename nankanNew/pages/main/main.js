var page = 1;
var pageSize = 3;
var lmid = 142;
let app = getApp()
var host = app.globalData.HOST;
Page({
  data: {
    uid:'',
    tabbar: {}
  },
  onLoad: function () {
    var that = this;
    app.editTabBar();
    wx.getStorage({
      //获取数据的key
      key: 'phone',
      success: function (res) {
        var phone = res.data;
        wx.request({
          url: host + 'api/User?tel='+phone,
          data: {},
          method: 'POST',
          header: { 'content-type': 'application/json' },
          success: function (res) {
              that.setData({
              uid: res.data.ID,
              })
            wx.setStorage({
              key: 'data',
              data: res.data,
            })
          }
        })
      }
    })
    wx.request({
      url: host + "/api/News",
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
      },
    })
    wx.request({
      url: host + "/api/Link",
      data: { lmid: 40 },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          lunbotu: res.data
        })
      }

    })
  },

  /**
  * 南康要闻
  */
  news: function () {
    var lmid = 18;
    wx.navigateTo({
      url: '../zhixun/news/news?lmid=' + lmid
    })
  },

  /**
  * 理论观点
  */
  theory: function () {
    var lmid = 24;
    var id = this.data.uid;;
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
  * 调研提案
  */
  proposal: function () {
    var id = this.data.uid;
    console.log(id);
    new app.WeToast();
    if (this.data.uid == 0) {
      this.wetoast.toast({
        title: '没有你的委员信息无法进入提案',
        duration: 1000
      })
     } else{
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
    if(this.data.uid==0){
      this.wetoast.toast({
        title: '没有你的委员信息无法进入鉴评',
        duration: 1000
      })
    } else{
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
    console.log("vvvvv:"+uid);
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


  /**
  * 查看更多公告
  */
  more: function () {
    var lmid = 142;
    wx.navigateTo({
      url: '../zhixun/dynamic/dynamic?lmid=' + lmid
    })
  },

  /**
  * 公告详情
  */
  announcement: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../zhixun/dynamicDetail/dynamicDetail?id=' + id
    })
  },
})
