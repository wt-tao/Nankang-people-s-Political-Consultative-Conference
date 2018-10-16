var WxParse = require('../../../wxParse/wxParse.js');
var QR = require("../../../utils/qrcode.js");

let app = getApp()
var host = app.globalData.HOST;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    deptIndex: 0,
    deptArray: [],
    idArray: [],
    title: '',
    id: '',
    pepole: '',
    uid: '',
    token: '',
    imgurl:'',
    // luid:''
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
        var id = res.data.ID
        that.setData({
          uid: res.data.ID,
          uName: res.data.Name
        })
      }
    })
    // wx.getStorage({
    //   //获取数据的key
    //   key: 'storage',
    //   success: function (res) {
    //     var id = res.data.ID
    //     that.setData({
    //       luid: res.data.ID,
    //       luName: res.data.Name
    //     })
    //   }
    // })

    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000,
      success: function () {
        wx.request({
          url: host + "/api/Activity",
          data: {
            id: id,
            mid: 149
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var n = res.data.Time
            var Date = n.substring(0, 10);
            res.data.Time = Date
            var aid1 = that.data.uid
            var aid2 = res.data.PeoperID
            if (aid1 == aid2) {
                  var acckey = res.data.access_token;
                  var page = "pages/lvzhi/SignActivity/SignActivity"
                  wx.request({
                    url: host + "api/SignCode/" + id + "?page=" + page,
                    data: {},
                    header: {
                      'content-type': 'application/json'
                    },
                    method: 'POST',
                    success: function (res) {
                      var array = wx.base64ToArrayBuffer(res.data);
                      var base64 = wx.arrayBufferToBase64(array);
                      //将转后的信息赋值给image的src 
                      that.setData({ 
                        imgurl: "data:image/png;base64," + base64 
                        });
                    }
              })
            // } else if (aid3==aid2){
            //       var page = "pages/lvzhi/SignActivity/SignActivity"
            //       wx.request({
            //          url: host + "api/SignCode/" + id + "?page=" + page,
            //         data: {},
            //         header: {
            //           'content-type': 'application/json'
            //         },
            //         method: 'POST',
            //         success: function (res) {
            //           var array = wx.base64ToArrayBuffer(res.data);
            //           var base64 = wx.arrayBufferToBase64(array);
            //           console.log("data:image/png;base64," + base64)
            //           //将转后的信息赋值给image的src 
            //           that.setData({
            //             imgurl: "data:image/png;base64," + base64
            //           });
                     
            //         }
            //       })
            }
            that.setData({
              list: res.data,
              id: res.data.ID,
              title: res.data.Name,
              pepole: res.data.Peoper,
            })
          }
        })
      }
    })
  },

  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    wx.previewImage({
      current: this.data.imgurl, // 当前显示图片的http链接   
      urls: [this.data.imgurl]
    })
  },
})

  