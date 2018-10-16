// pages/lvzhi/through/through.js
let app = getApp()
var host = app.globalData.HOST;
var page = 1;
var pageSize = 50;
var lmid = 149;
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
    uid: '',
    signStata: '',
    joinPeoperID: '',
    join:[],
    lid:'',
    luid:'',

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
        var uid =res.data.ID;
        wx.request({
          url: host + "/api/Activity",
          data: {
            pageIndex: page,
            pageSize: pageSize,
            mid: lmid,
            Uid: uid
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            that.setData({
              list: res.data
            })
          }
        })
      }
    })
  },

  radioCheckedChange: function (e) {
    this.setData({
      radioCheckVal: e.detail.value,
    })
  },

  //活动主题
  activityTheme: function (e) {
    this.setData({
      show1: true,
      show2: false,
      show3:false,
      id: e.currentTarget.id
    })
  },

  //活动记录
  history: function (e) {
    this.setData({
      show1: false,
      show2: true,
      show3: false,
      id: e.currentTarget.id
    })
    
  },

  //活动报告
  record: function (e) {
    this.setData({
      show1: false,
      show2: false,
      show3: true,
      id: e.currentTarget.id
    })
  },
  /**
   * 活动主题
   */
  theme: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../theme/theme?id=' + id
    })
  },

  /**
  * 活动记录详情
  */
  acitivityDetail: function (e) {
    // new app.WeToast();
    // var that = this;
    var hid = e.currentTarget.id;
    // var id = this.data.uid;
    // var lid = this.data.lid;
    // console.log(lid);
    //  var string_id = e.currentTarget.dataset.joinpeoperid + ",";
    //  console.log(string_id);
 
    // var temp = "";
    // var numberlist = [];
    // for (var i = 0; i < string_id.length; i++) {
    //   if (string_id.charAt(i) == ",") {
    //     numberlist.push(temp);
    //     temp = "";
    //   }
    //   else {
    //     temp += string_id.charAt(i);
    //   }
    // }
    // var flag = 0;
    // for (var i in numberlist) {
    //   if (id == numberlist[i]) {
    //     flag = 1;  
    //   }
    // }
    // for (var i in numberlist) {
    //   if (lid == numberlist[i]) {
    //     flag = 1;
    //   }
    // }
    // if (flag == 1) {
      wx.navigateTo({
        url: '../activityDetail/activityDetail?id=' + hid,
      })
    // } else {
    //   this.wetoast.toast({
    //     title: '该用户没有参加这项活动',
    //     duration: 1000
    //   })
    // }
  },

  /**
  * 活动报告
  */
  report: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../../lvzhi/reportDetail/reportDetail?id=' + id
    })
  },


   /**
 * 查询
 */
  serach: function (e) {
    this.setData({
      serach: e.detail.value
    })
  },
  serachSumbit: function () {
    new app.WeToast();
    var serach = this.data.serach
    var that = this;
    wx.request({
      method: 'POST',
      url: host + "/api/Project?value=" + serach,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.length == 0) {
          that.wetoast.toast({
            title: '查询为空',
            duration: 1000,
          })
          that.setData({
            list: res.data
          })
        } else {
          that.setData({
            list: res.data
          })
        }
      }
    })
  },

  /**
   * 增加活动发起
   */
  add:function(){
    wx.navigateTo({
      url: '../../lvzhi/activityRelease/activityRelease'
    })
  },

  /**
 * 刷新
 */
  refresh: function () {
    var that = this;
    wx.request({
      url: host + "/api/Project",
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
      }
    })
  },

})
