// pages/lvzhi/review/review.js
var QR = require("../../../utils/qrcode.js");
let app = getApp();
var host = app.globalData.HOST;
Page({
  /**
   * 页面的初始数据
   */
  data: {
  name:'',
  show1: true,
  show2: false,
  radioCheckVal: 1,
  id: "1",
  canvasHidden: false,
  maskHidden: true,
  imagePaths: '',
  own:'',
  phoneNumber:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var size = this.setCanvasSize();
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'data',
      success: function (res) {
       var uid = res.data.ID;
       console.log(res)
      wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000,
      success: function () {
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
              phoneNumber:res.data.tel 
          })
            var name = res.data.Name;
            var jiebie = res.data.jieBie
            var jieci = res.data.jieci
            var zwh = res.data.zwh;
            var job = res.data.job;
            var duokou = res.data.duikouzwh;
            var phone = res.data.tel
            var context = "姓名：" + name + "\n" + "届次：" + jieci +
              "\n" + "所属专委会：" + zwh + "\n" + "现任职位：" + job +
              "\n" + "对口联系专委会：" + duokou + "\n" + "电话：" + phone
            var st = setTimeout(function () {
              wx.hideToast()
              var size = that.setCanvasSize();
              //绘制二维码
              that.createQrCode(context, "mycanvas", size.w, size.h);
              that.setData({
                maskHidden: true
              });
              clearTimeout(st);
            }, 100)
        }
     })
        wx.request({
          method: 'POST',
          url: host + "/api/Product/" + uid,
          data: {
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var n = res.data.Time
            var Date = n.substring(0, 10);
            res.data.Time = Date;
            var tianCount = res.data.tianAllCount;
            var sheqingCount = res.data.minyiAllCount;
            var huiyiCount = res.data.zxhyAllCount;
            var huodongCOunt = res.data.zxhdAllCount;
            var total = tianCount + sheqingCount + huiyiCount + huodongCOunt;
            console.log(total);
            that.setData({
              archives: res.data,
              total: total
            })
          }
        })
    }
    })
      }
    })
  
    // wx.getStorage({
    //   //获取数据的key
    //   key: 'storage',
    //   success: function (res) {
    //     var uid = res.data.ID;
    //     wx.showToast({
    //       title: '加载中...',
    //       icon: 'loading',
    //       duration: 1000,
    //       success: function () {
    //         wx.request({
    //           url: host + "/api/Product",
    //           data: {
    //             id: uid
    //           },
    //           header: {
    //             'content-type': 'application/json'
    //           },
    //           success: function (res) {
    //             that.setData({
    //               list: res.data,
    //               own: res.data.isOwin,
    //               phoneNumber: res.data.tel
    //             })
    //             var name = res.data.Name;
    //             var jiebie = res.data.jieBie
    //             var jieci = res.data.jieci
    //             var zwh = res.data.zwh;
    //             var job = res.data.job;
    //             var duokou = res.data.duikouzwh;
    //             var phone = res.data.tel
    //             var context = "姓名：" + name + "\n" + "届次：" + jieci +
    //               "\n" + "所属专委会：" + zwh + "\n" + "现任职位：" + job +
    //               "\n" + "对口联系专委会：" + duokou + "\n" + "电话：" + phone
    //             var st = setTimeout(function () {
    //               wx.hideToast()
    //               var size = that.setCanvasSize();
    //               //绘制二维码
    //               that.createQrCode(context, "mycanvas", size.w, size.h);
    //               that.setData({
    //                 maskHidden: true
    //               });
    //               clearTimeout(st);
    //             }, 100)
    //           }
    //         })
    //         wx.request({
    //           method: 'POST',
    //           url: host + "/api/Product/" + uid,
    //           data: {
    //           },
    //           header: {
    //             'content-type': 'application/json'
    //           },
    //           success: function (res) {
    //             var n = res.data.Time
    //             var Date = n.substring(0, 10);
    //             res.data.Time = Date
               
    //             var n = res.data.Time
    //             var Date = n.substring(0, 10);
    //             res.data.Time = Date;
    //             var tianCount = res.data.tianAllCount;
    //             var sheqingCount = res.data.minyiAllCount;
    //             var huiyiCount = res.data.zxhyAllCount;
    //             var huodongCOunt = res.data.zxhdAllCount;
    //             var total = tianCount + sheqingCount + huiyiCount + huodongCOunt;
    //             console.log(total);
    //             that.setData({
    //               archives: res.data,
    //               total:total,
    //             })
    //           }
    //         })
    //       }
    //     })
      //}
    //})
  
  },

  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var width = 100
      var height = 100;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => { this.canvasToTempImage(); }, 10);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
         that.setData({
           imagePath: tempFilePath,
         });
      },
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    wx.previewImage({
      current: this.data.imagePath, // 当前显示图片的http链接   
      urls: [this.data.imagePath]
    })
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },

  radioCheckedChange: function (e) {
    this.setData({
      radioCheckVal: e.detail.value,
    })
  },

  //委员管理
  member: function (e) {
    this.setData({
      show1: true,
      show2: false,
      id: e.currentTarget.id
    })
    var size = this.setCanvasSize();
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'data',
      success: function (res) {
        var uid = res.data.ID;
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
                })
                var name = res.data.Name;
                var jiebie = res.data.jieBie
                var jieci = res.data.jieci
                var zwh = res.data.zwh;
                var job = res.data.job;
                var duokou = res.data.duikouzwh;
                var phone = res.data.tel
                var context = "姓名：" + name + "\n" + "届次：" + jieci +
                  "\n" + "所属专委会：" + zwh + "\n" + "现任职位：" + job +
                  "\n" + "对口联系专委会：" + duokou + "\n" + "电话：" + phone
                var st = setTimeout(function () {
                  wx.hideToast()
                  var size = that.setCanvasSize();
                  //绘制二维码
                  that.createQrCode(context, "mycanvas", size.w, size.h);
                  that.setData({
                    maskHidden: true
                  });
                  clearTimeout(st);
                }, 10)
              }
            })
          }
        })
  },

  //档案管理
  archives: function (e) {
    this.setData({
      show1: false,
      show2: true,
      id: e.currentTarget.id
    })
  },
    //授权
  allMember:function(){
    new app.WeToast();
    var own = this.data.own;
     if(own == 1){
       wx.navigateTo({
         url: '../member/member',
       })
     } else{
       this.wetoast.toast({
         title: '未授权',
         duration: 1000,
     })
 }
},
    allarchvies:function(){
      new app.WeToast();
      var own = this.data.own;
      if (own == 1) {
        wx.navigateTo({
          url: '../archives/archives',
        })
      } else {
        this.wetoast.toast({
          title: '未授权',
          duration: 1000,
        })
      }
  },
  
  /**
   * 一键拨打电话
   */
  phonecallevent:function(){
    var phoneNumber = this.data.phoneNumber;
    wx.makePhoneCall({
      phoneNumber:phoneNumber
    })
  }
  })
  


 
 
