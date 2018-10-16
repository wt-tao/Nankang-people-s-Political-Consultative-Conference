// pages/lvzhi/memberDetail/memberDetail.js
var QR = require("../../../utils/qrcode.js");
var app = getApp();
var host = app.globalData.HOST;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasHidden: false,
    maskHidden: true,
    imagePath: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var size = this.setCanvasSize();
    var id = options.id;
    var that = this;
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000,
      success: function () {
        wx.request({
          url: host+"/api/Product",
          data: {
            id: id
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
              var zwh  = res.data.zwh;
              var job = res.data.job;
              var duokou = res.data.duikouzwh;
              var phone = res.data.tel
              var context = "姓名：" + name + "\n" + "届次：" + jieci + 
                "\n" + "所属专委会：" + zwh +"\n" + "现任职位："+ job +
                "\n" + "对口联系专委会：" + duokou + "\n" +"电话："+ phone
              var st = setTimeout(function () {
                wx.hideToast()
                var size = that.setCanvasSize();
                //绘制二维码
                that.createQrCode(context, "mycanvas", size.w, size.h);
                that.setData({
                  maskHidden: true
                });
                clearTimeout(st);
              }, 2000)
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

  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
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
    setTimeout(() => { this.canvasToTempImage(); }, 1000);

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
          // canvasHidden:true
        });
      },
      fail: function (res) {
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath;
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },

  /**
 * 一键拨打电话
 */
  phonecallevent: function () {
    var phoneNumber = this.data.phoneNumber;
    wx.makePhoneCall({
      phoneNumber: phoneNumber
    })
  }
})
 
 