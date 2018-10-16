// pages/lvzhi/member/member.js
var page = 1;
var pageSize = 50;
var lmid = 119;
let app = getApp()
var host = app.globalData.HOST;
Page({

  
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    signStata:'',
    joinPeoperID: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    new app.WeToast();
    wx.getStorage({
      //获取数据的key
      key: 'data',
      success: function (res) {
        that.setData({
          id: res.data.ID,
          name:res.data.Name
        })
      }
    })
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000,
      success: function () {
        wx.request({
          url: host+"/api/Project",
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
              list: res.data,
              
            })
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
   /**
   * 活动信息详情
   */
  acitivityDetail:function(e){
    var that = this;
    var hid = e.currentTarget.id;
    var id = this.data.id;
    var string_id = e.currentTarget.dataset.joinpeoperid+",";
    var SingPeoper_id = e.currentTarget.dataset.signpeoperid + ",";
    var temp="";
    var temp1="";
    var numberlist=[];
    var signList=[];
    for (var i = 0; i < string_id.length;i++){
        if (string_id.charAt(i) == ","){
          numberlist.push(temp);
          temp="";      
        }
        else{
          temp += string_id.charAt(i);
        }
    }
    for (var i = 0; i < SingPeoper_id.length; i++) {
      if (SingPeoper_id.charAt(i) == ",") {
        signList.push(temp1);
        temp1 = "";
      }
      else {
        temp1 += SingPeoper_id.charAt(i);
      }
    }
    var flag=0;
    for (var i in numberlist){
      if (id == numberlist[i]){
        flag=1;     
      }             
    }
    for (var i in signList) {
      if (id == signList[i]) {
        flag=2;
      }
    }


    if(flag==1){
      wx.navigateTo({
        url: '../SignActivity/SignActivity?id=' + hid,
          })
      } else if(flag==2) { 
      wx.navigateTo({
          url: '../activityDetail/activityDetail?id=' + hid,
      })
   } else{
      this.wetoast.toast({
        title: '该用户没有参加这项活动',
        duration: 1000
      })  
    }


   
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

  }

})