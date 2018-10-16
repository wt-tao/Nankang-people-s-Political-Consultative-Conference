// pages/lvzhi/proposal/proposal.js
let app = getApp()
var host = app.globalData.HOST;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1: true,
    show2: false,
    show3:false,
    radioCheckVal: 1,
    id: "1",
    source:'',
    uid:'',
    own:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'data',
      success: function (res) {
        that.setData({
          source: res.data.Name,
          uid:res.data.ID
        })
      }
    })
    // wx.getStorage({
    //   //获取数据的key
    //   key: 'storage',
    //   success: function (res) {
    //     that.setData({
    //       source: res.data.Name,
    //       uid: res.data.ID
    //     })
    //   }
    // })
  },
  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    new app.WeToast();
  },

  /**
   * 提交提案
   */
   
  formSubmit:function(e){
    var that = this;
    var Title = e.detail.value.title;
    var Content = e.detail.value.content;
    var source = this.data.source;
    var id =this.data.uid;
    if (Title == "") {
      this.wetoast.toast({
        title: '提案名称不能为空',
        duration: 500,
      })
    } else if(Content == ""){
      this.wetoast.toast({
        title: '内容不能为空',
        duration: 500,
      })
    } else{
    wx.request({
      method: 'POST',
      url: host + 'api/News?title=' + Title + '&content=' + Content + '&source=' + source + '&Uid=' + id,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
        });
        that.setData({
          Title:'',
          Content: ''
        })  
  }
    })
    }
  },
  
  radioCheckedChange: function (e) {
    this.setData({
      radioCheckVal: e.detail.value,
    })
  },


  //提案提交
  submit:function(e){
    this.setData({
     show1:true,
     show2:false,
     show3:false,
    })
  },

  //精彩提案
  wodeful: function (e) {
    this.setData({
      show1:false,
      show2: true,
      show3: false,
      id: e.currentTarget.id
    })
      var that = this
          wx.request({
            url: host + "/api/News",
            data: {
              lmid: 152,
              isOwin: 1
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              for (var i in res.data) {
                var n = res.data[i].Time
                var Date = n.substring(0, 10);
                res.data[i].Time = Date
              }
              that.setData({
                proposal: res.data,
              })
            }
          })
      },

  //办理动态
  handle: function (e) {
    var uid = this.data.uid;
    var ulid = this.data.ulid;
    this.setData({
      show1: false,
      show2: false,
      show3:true,
      id: e.currentTarget.id
    })
    var that = this
    wx.request({
      url: host + "/api/News",
      data: {
        lmid: 152,
        isOwin: 0
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        for (var i in res.data) {
          var n = res.data[i].Time
          var Date = n.substring(0, 10);
          res.data[i].Time = Date
        }
        that.setData({
          handle: res.data,

        })
      }
    })
    wx.request({
      url: host + "/api/Product",
      data: {
        id: uid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          list: res.data,
          own: res.data.isOwin,
        })
      }
    })
  },


   /**
   * 精彩提案
   */
    proposal: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../../lvzhi/proposalDetail/proposalDetail?id=' + id
    })
  },
 /**
   * 办理动态
   */
    handleDetail: function (e) {
      var id = e.currentTarget.id;
      var sourceName = e.currentTarget.dataset.name;
      new app.WeToast();
      var own = this.data.own;
      var loginName = this.data.source;
      if (own == 1) {
      wx.navigateTo({
        url: '../../lvzhi/handleDetail/handleDetail?id=' + id
      })
      } else if(loginName==sourceName){
        wx.navigateTo({
          url: '../../lvzhi/handleDetail/handleDetail?id=' + id
        })
      } else {
        this.wetoast.toast({
          title: '未授权',
          duration: 1000,
        })
      }
    }


})