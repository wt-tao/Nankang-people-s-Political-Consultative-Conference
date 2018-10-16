// pages/lvzhi/SignActivity/SignActivity.js
// 引用百度地图微信小程序JSAPI模块     
var bmap = require('../../../utils/bmap-wx.min.js');
let app = getApp()
var host = app.globalData.HOST;
var wxMarkerData = [];  //定位成功回调对象  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ak: "Vhlnk5GEMpiFj1ZDHREcWh17hGvRfToM",
    id: '',
    uid: '',
    longitude: '',   //经度    
    latitude: '',    //纬度    
    address: '',     //地址  
    activityAddress: '',
    joinID: '',
    code: '',
    hdTime:'',
    hdID:'',
    SingPeoperID:'',
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
          name: res.data.Name
        })
      }
    })
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.setData({
          code: res.code
        })
      }
    })
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        address: wxMarkerData[0].address,
      });
    }
    BMap.regeocoding({
      success: success
    });
      
     var scene = decodeURIComponent(options.scene);
    wx.request({
      url: host + "/api/Activity",
      data: {
        id: scene,
        mid: 149
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
          joinID: res.data.JoinPeoperID,
          activityAddress: res.data.Address,
          hdTime: res.data.hdTime,
          hdID: res.data.ID,
          SingPeoperID: res.data.SingPeoperID,
        })
      }
    })
    wx.request({
      method: 'GET',
      url: host + 'api/User/' + scene,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          listStatus: res.data,
          status: res.data.SignStata,
        })
      }
    })
  },

    //刷新
      refresh:function(){
        var that = this;
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            that.setData({
              code: res.code
            })
          }
        })
        var hdId = that.data.hdID
        wx.request({
          url: host + "/api/Activity",
          data: {
            id: hdId,
            mid: 149
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
              joinID: res.data.JoinPeoperID,
              activityAddress: res.data.Address,
              hdTime: res.data.hdTime,
              hdID: res.data.ID,
              SingPeoperID: res.data.SingPeoperID,
            })
          }
        })
        wx.request({
          method: 'GET',
          url: host + 'api/User/' + hdId,
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            that.setData({
              listStatus: res.data,
              status: res.data.SignStata,
            })
          }
        })
      },
  /**
   * 签到
   */
  getPhoneNumber: function (e) {
    new app.WeToast();
    var join = this.data.joinID + ","
    var temp = "";
    var singtemp="";
    var numberlist = [];
    var singeList=[];
    var flag = 0;
    var that = this;
    var iv = e.detail.iv;
    var encryptedData = e.detail.encryptedData;
    var address = this.data.address;
    var activityAddress = this.data.activityAddress;
    var uid = this.data.uid;
    var hdTime = this.data.hdTime
    var date = new Date();
    var Y = date.getFullYear() + '/';
    var M = date.getMonth() + 1 + '/';
    var D = date.getDate() < 10 ? + date.getDate() : date.getDate();
    var h = (date.getHours() + ":");
    var m = (date.getMinutes() + ":");
    var s = (date.getSeconds());
    var Time = Y + M + D + "\t" + h + m + s;
    var date1 = new Date(hdTime)
    var hdDate = hdTime.substring(0, 8)
    var date2 = new Date(Time)
    var timeDate = Time.substring(0, 8)
    var s1 = date1.getTime(), s2 = date2.getTime();
    var total = (s2 - s1) / 1000;
    var day = parseInt(total / (24 * 60 * 60))
    var afterDay = total - day * 24 * 60 * 60;
    var hour = parseInt(afterDay / (60 * 60));
    var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;
    var min = parseInt(afterHour / 60);
    var hdID = this.data.hdID;
    var SingPeoperID = this.data.SingPeoperID+ ","
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
    } else {
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
        success: function (res) {
          var phoneNumber = res.data.Phone;
          var phone = phoneNumber.substring(16, 27);
          wx.request({
            url: host + "api/User?tel=" + phone,
            data: {},
            header: {
              'content-type': 'application/json'
            },
            method: 'POST',
            success: function (res) {
              var uid = res.data.ID
              ////////////////////////////////////////
              for (var i = 0; i < join.length; i++) {
                if (join.charAt(i) == ",") {
                  numberlist.push(temp);
                  temp = "";
                } else {
                  temp += join.charAt(i);
                }
              }
              for (var i in numberlist) {
                if (uid == numberlist[i]) {
                  flag = 1;
                }
              }
            //////////////////////////////////////////
              for (var j = 0; j < SingPeoperID.length; j++) {
                if (SingPeoperID.charAt(j) == ",") {
                  singeList.push(singtemp);
                  singtemp = "";
                } else {
                  singtemp += SingPeoperID.charAt(j);
                }
              }
              for (var j in singeList) {
                if (uid == singeList[j]) {
                  flag = 2;
                }
              }
              if (flag == 1) {
                if (min < 30 && hour == 0 && timeDate==hdDate) {
                  wx.request({
                    method: 'PUT',
                    url: host + "api/Project/"+hdID+"?uid="+uid,
                    data: {
                    },
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                      wx.showToast({
                        title: "签到成功",
                        duration: 2000,
                      })
                      that.refresh();
                    }
                   
                  })
                } else {
                  that.wetoast.toast({
                    title: '没到签到时间或者超过签到时间',
                    duration: 1000
                  })
                  that.refresh();
                }
              } else if (flag == 2) {
                that.wetoast.toast({
                  title: '已签到',
                  duration: 1000
                })
                that.refresh();
                  
                  } else {
                  that.wetoast.toast({
                    title: '没有参加活动无法签到',
                    duration: 1000
                  })
                  that.refresh();
                }
              }
            })
        }
      })
    }
  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },

})


