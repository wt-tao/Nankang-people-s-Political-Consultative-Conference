// pages/zhixun/comment/comment.js
var app = getApp()
var host = app.globalData.HOST;
 var page = 1;
 var pageSize = 5;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    title:'',
    nickName:'',
    lmid:'',
    head:'',
    searchLoading: false,
    searchLoadingComplete: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    var title = options.title
    var lmid = options.lmid;

    wx.getUserInfo({
      success: function (res) {
        that.setData({
          nickName:res.userInfo.nickName,
          head: res.userInfo.avatarUrl
        })
      }
    })
    that.setData({
      title:title,
      id:id,
      lmid:lmid
     }) 
    wx.request({
      url: host+'/api/GuestBook/',
      data:{
           id,
           mid:145,
           pageIndex:page,
           pageSize,pageSize
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
        comment:res.data,
       
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
  formSubmit:function(e){
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
    var Time = Y + M + D + "\t" + h + m + s;
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
        console.log(res);
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
   * 继续查看评论
   */
  more:function(){
    var lmid = this.data.lmid;
    var title = this.data.title;
    var id= this.data.id;
    wx.navigateTo({
      url: '../moreComment/moreComment?id='+id+'&title='+title+'&lmid=' + lmid
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

})