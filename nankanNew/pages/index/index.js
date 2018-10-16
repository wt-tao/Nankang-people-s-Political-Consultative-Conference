//index.js  
//获取应用实例  
var page = 1;
var pageSize=3;
var lmid=142;
var app=getApp();
Page({
  data: {
  },     
  onLoad: function () {
    var that = this;
    var host = app.globalData.HOST
    wx.request({
      url: host+"/api/News",
      data: {
        pageIndex: page,
        pageSize:pageSize,
        lmid:lmid
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
      url: host+"/api/Link",
      data:{lmid:40},
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          lunbotu:res.data
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
    wx.navigateTo({
      url: '../zhixun/theory/theory?lmid=' + lmid
    })
  },

  /**
  * 调研提案
  */
  proposal:function(){
     wx.navigateTo({
       url: '../lvzhi/proposal/proposal'
    })
  },

  /**
  * 履职鉴评
  */
  review: function () {
    //  wx.showToast({
    //    icon: 'loading',
    //    title: '正在开发中',
    //  })
      wx.navigateTo({
        url: '../lvzhi/review/review'
      })
  },

  /**
  * 民意直通
  */
  
   through:function(){
     var lmid = 148;
     wx.navigateTo({
       url: '../lvzhi/through/through?lmid=' + lmid,
     })
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
   stone:function(){
     var lmid = 155;
     wx.navigateTo({
       url: '../jiaoliu/stone/stone?lmid='+lmid,
     })
   },


  /**
  * 查看更多公告
  */
  more:function(){
     var lmid=142;
    wx.navigateTo({
      url: '../zhixun/dynamic/dynamic?lmid='+lmid
  })
  },

  /**
  * 公告详情
  */
  announcement:function(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../zhixun/dynamicDetail/dynamicDetail?id=' + id
  })
  } 
})
