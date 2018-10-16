var WxParse = require('../../../wxParse/wxParse.js');
var app = getApp();
var host = app.globalData.HOST;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    list: '',
    view: '',
    title:'',
    lmid: 145,
    uploadimgs: '',
    uid:'',
    nickName:'',
    head:'',
    comment:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'data',
      success: function (res) {
        that.setData({
          uid: res.data.ID,
        })
      }
    })
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
          url: host + "/api/Activity",
          data: {
            id: id,
            mid:149
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var n = res.data.Time
            var Date = n.substring(0, 10);
            res.data.Time = Date
            that.setData({
              list: res.data,
              id: res.data.ID,
              title:res.data.Name,
            })
          }
        })
      }
  })
    wx.request({
      url: host + '/api/GuestBook/',
      data: {
        id,
        mid: 145,
        pageIndex: 1,
        pageSize: 5,
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

  chooseImageTap: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })

  },
  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        _this.setData({
          uploadimgs: res.tempFilePaths,
          flag: true
        })
      }
    })
  },

  /**
   * 提交评论
   */
  formSubmit: function (e) {
    var that = this;
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
    var imgs = this.data.uploadimgs[0];
     if(imgs ==undefined){
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
     } else{
    wx.uploadFile({
      url: host + 'api/GuestBook?lmid=' + 145,
      filePath: imgs,
      name: 'Img',
      header: {
        'content-type':'multipart/form-data'
      },
      formData: {
        Name: Name,
        HeadImageUrl: HeadImgUrl,
        Title: Title,
        Time: Time,
        NewsID: NewsID,
        Content: Content,
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
     }
   
  },
  
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = e.currentTarget.dataset.name
    wx.previewImage({
      current: img, // 当前显示图片的http链接   
      urls: [img]
    })
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
        url: '../reportDetail/reportDetail?id=' + id
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
        url: '../reportDetail/reportDetail?id=' + id
      })
    }
  }
})