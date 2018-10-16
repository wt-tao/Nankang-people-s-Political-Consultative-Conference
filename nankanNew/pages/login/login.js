// pages/login/login.js
let app = getApp()
var host = app.globalData.HOST;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
    code: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    new app.WeToast();
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.setData({
          code: res.code
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  phone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  password: function(e) {
    this.setData({
      password: e.detail.value
    })
  },



  /**
   * 登录
   */
  getPhoneNumber: function(e) {
    console.log(e);
    var that = this;
    var iv = e.detail.iv;
    var encryptedData = e.detail.encryptedData;
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {} else {
      var code = this.data.code
      wx.request({
        url: host + 'api/Phone',
        data: {
          code: code,
          encryptedData: encryptedData,
          iv: iv
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function(res) {
          var phoneNumber = res.data.Phone;
          var phone = phoneNumber.substring(16, 27);
          wx.request({
            url: host + "api/User?tel=" + phone,
            data: {},
            header: {
              'content-type': 'application/json'
            },
            method: 'POST',
            success: function(res) {
              wx.setStorage({
                key: 'phone',
                data: phone,
              })
              wx.getStorage({
                //获取数据的key
                key: 'phone',
                success: function(res) {
                  var phone = res.data;
                  wx.request({
                    url: host + 'api/User?tel=' + phone,
                    data: {},
                    method: 'POST',
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function(res) {
                      var id = res.data.ID;
                      if (id == 0) {
                        that.wetoast.toast({
                          title: '您的委员信息暂未录入',
                          duration: 1000
                        })
                        setTimeout(function () {
                          wx.redirectTo({
                            url: '../login/login'
                          })
                        }, 1000)
                      } else {
                        wx.redirectTo({
                          url: '../main/main'
                        })
                      }
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  }
})