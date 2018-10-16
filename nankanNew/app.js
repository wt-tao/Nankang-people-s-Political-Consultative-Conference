let { WeToast } = require('src/wetoast.js') 

//app.js
App({
  WeToast,
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  editTabBar: function () {
    var tabbar = this.globalData.tabbar,
      currentPages = getCurrentPages(),
      _this = currentPages[currentPages.length - 1],
      pagePath = _this.__route__;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (var i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    userInfo: null,
    HOST : "https://nkzxapi.wm42.mingtengnet.com/",
     tabbar: {
      color: "#fff",
      selectedColor: "#FFFF00",
      backgroundColor: "#993300",
      borderStyle: "#993300",
      list: [
        {
          pagePath: "/pages/main/main",
          text: "南康首页",
          iconPath: "/images/news@1x-w.png",
          selectedIconPath: "/images/news@1x-y.png",
          selected: true
        },
        {
          pagePath: "/pages/zhixun/zhixun",
          text: "微观资讯",
          iconPath: "/images/news@3x-w.png",
          selectedIconPath: "/images/news@3x-y.png",
          selected: false
        },
        {
          pagePath: "/pages/lvzhi/lvzhi",
          text: "参政履职",
          iconPath: "/images/redact@3x-w.png",
          selectedIconPath: "/images/redact@3x-y.png",
          selected: false
        },
         {
           pagePath: "/pages/jiaoliu/jiaoliu",
           text: "学习交流",
           iconPath: "/images/read@3x-w.png",
           selectedIconPath: "/images/read@3x-y.png",
           selected: false
        }
      ],
      position: "bottom"
    }
  }
})