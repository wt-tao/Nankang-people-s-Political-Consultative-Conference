let app = getApp();
var host = app.globalData.HOST;
var lmid = 149;
Page({

      /**
       * 页面的初始数据
       */
      data: {
        jieci: '',
        typeArray: [],
        idArray: [],
        typeIndex: 0,
        hasfinancing: true,
        uid: '',
        uName: '',
        showView: false,
        other: [],
        listW: [],
        numberlist: [],
        committee:'',
      },
      choice: '',
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
        showView: (options.showView == "true" ? true : false)
        var that = this;
        wx.getStorage({
          //获取数据的key
          key: 'data',
          success: function(res) {
            var id = res.data.ID
            that.setData({
              uid: res.data.ID,
              uName: res.data.Name,
              committee: res.data.Committee
            })
            wx.request({
              url: host + 'api/Activity/' + id,
              data: {},
              method: 'GET',
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                that.setData({
                  list: res.data
                })
              }
            })
          }
        })
      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function() {
        var that = this;
        new app.WeToast();
        wx.request({
          url: host + '/api/ClassSys',
          data: {
            mid: 41
          },
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            var className = [];
            var id = [];
            for (var i in res.data) {
              className.push(res.data[i].className);
              id.push(res.data[i].ID);
            }
            that.setData({
              typeArray: className,
              idArray: id
            })
          }
        })
        wx.request({
          url: host + 'api/Activity/',
          data: {
            s: 'wxy'
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            that.setData({
              listW: res.data
            })
          }
        })
      },

      /**
       * 下拉框
       */
      bindPickerChange: function(e) {
        if (e.detail.value == 4) {
          this.setData({
            reply: true
          })
        } else {
          this.setData({
            reply: false
          })
        }
        this.setData({
          typeIndex: e.detail.value,
          flat: true
        })

      },

      checkboxChange: function(e) {
        this.setData({
          choice: e.detail.value
        })
      },
      checkboxOtherChange: function(e) {
        var selected = e.target.dataset.checks ? false : true;
        for (var j = 0; j < e.detail.value.length; j++) {
          var flag = 0;
          for (var i = 0; i < this.data.other.length; i++) {
            if (e.detail.value[j] == this.data.other[i].ID) {
              flag = 1;
              break;
            }
          }
          if (flag == 0) {
            var temp = {
              ID: '',
              checks: true,
              OtherName: ''
            };
            for (var i = 0; i < this.data.listW.length; i++) {
              if (e.detail.value[j] == this.data.listW[i].ID) {
                temp.ID = this.data.listW[i].ID;
                temp.checks = true;
                temp.OtherName = this.data.listW[i].OtherName;
              }
            }
            this.setData({
              other: this.data.other.concat(temp)
            })
          }
        }
      },

      // checkboxCancelChange: function(e) {
      //   var arr = [];
      //   for (var i = 0; i < e.detail.value.length; i++) {
      //     var temp = {
      //       ID: '',
      //       checks: true,
      //       OtherName: ''
      //     };
      //     for (var j = 0; j < this.data.other.length; j++) {
      //       if (e.detail.value[i] == this.data.other[j].ID) {
      //         temp.ID = this.data.other[j].ID;
      //         temp.checks = true;
      //         temp.OtherName = this.data.other[j].OtherName;

      //       }
      //     }
      //     arr.push(temp);
      //   }
      //   this.setData({
      //     other: arr,
      //   });

      // },


      bindDateChange: function(e) {
        this.setData({
          dates: e.detail.value,
          flag: true
        })
      },

      bindTimeChange: function(e) {
        this.setData({
          times: e.detail.value,
          flas: true
        })
      },
      /**
       * 活动发起
       */
      formSubmit: function(e) {
        new app.WeToast();
        var Name = e.detail.value.Name;
        var Address = e.detail.value.Address;
        var Company = e.detail.value.Company;
        var flag;
        var BMclassID = this.data.idArray[e.detail.value.type]
        if(BMclassID==3){
          flag = 1
        } else{
          flag = 2
        }
        var date = e.detail.value.date
        var time = e.detail.value.time
        var hdTime = date + "\t" + time;
        var uid = this.data.uid;
        var uName = this.data.uName;
        var committee = this.data.committee;
        var jCID = String(this.data.choice);
        var temp_numberlist = this.data.numberlist;
        var otherActivityID = [];
        for (var i=0; i<this.data.other.length;i++) {
             temp_numberlist.push(this.data.other[i].ID);
        }
        for (var j = 0; j < temp_numberlist.length;j++) {
        this.setData({
          numberlist: temp_numberlist
        });
    }
        otherActivityID.push(this.data.numberlist);
        var otherID = String(otherActivityID)
        console.log(otherID);
    if (jCID == "undefined") {
      if (Name == "") {
        this.wetoast.toast({
          title: '请输入活动名称',
          duration: 1000
        })
      } else if (Address == "") {
        this.wetoast.toast({
          title: '请输入活动地址',
          duration: 1000
        })
      } else if (date == null) {
        this.wetoast.toast({
          title: '请选择日期',
          duration: 1000
        })
      } else if (time == null) {
        this.wetoast.toast({
          title: '请选择时间',
          duration: 1000
        })
      } else if (Company == "") {
        this.wetoast.toast({
          title: '请输入主办单位',
          duration: 1000
        })
      } else {
        var otherID = String(otherActivityID+","+uid);
        wx.request({
          url: host + "api/Activity?lmid="+149+"&bol="+committee +"&Meeting="+flag ,
          data: {
            Name: Name,
            hdClassName: BMclassID,
            hdTime: hdTime,
            Address: Address,
            Company: Company,
            Attendants: otherID,
            PeoperID: uid,
            Peoper: uName,
            joinClassID: '',
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            var flag = 1;
            wx.showToast({
              title: '提交成功',
              duration: 2000
            });
            if (flag == 1) {
              wx.navigateTo({
                url: '../through/through'
              })
            }
          }
        })
      }
      /////////////////////////////////////////////
    } else if (this.data.other == ""){
      if (Name == "") {
        this.wetoast.toast({
          title: '请输入活动名称',
          duration: 1000
        })
      } else if (Address == "") {
        this.wetoast.toast({
          title: '请输入活动地址',
          duration: 1000
        })
      } else if (Company == "") {
        this.wetoast.toast({
          title: '请输入主办单位',
          duration: 1000
        })
      } else {
        wx.request({
          url: host + "api/Activity?lmid=" + 149 + "&bol=" + committee + "&Meeting=" + flag,
          data: {
            Name: Name,
            hdClassName: BMclassID,
            hdTime: hdTime,
            Address: Address,
            Company: Company,
            Attendants: uid,
            PeoperID: uid,
            Peoper: uName,
            joinClassID: jCID,
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            var flag = 1;
            wx.showToast({
              title: '提交成功',
              duration: 2000
            });
            if (flag == 1) {
              wx.navigateTo({
                url: '../through/through'
              })
            }
          }
        })
      }
      //}
      /////////////////////////////////////////////
    } else {
      if (Name == "") {
        this.wetoast.toast({
          title: '请输入活动名称',
          duration: 1000
        })
      } else if (Address == "") {
        this.wetoast.toast({
          title: '请输入活动地址',
          duration: 1000
        })
      } else if (Company == "") {
        this.wetoast.toast({
          title: '请输入主办单位',
          duration: 1000
        })
      } else {
        var otherIDS = String(otherActivityID+","+uid)
        wx.request({
          url: host + "api/Activity?lmid=" + 149 + "&bol=" + committee + "&Meeting=" + flag,
          data: {
            Name: Name,
            hdClassName: BMclassID,
            hdTime: hdTime,
            Address: Address,
            Company: Company,
            Attendants: otherIDS,
            PeoperID: uid,
            Peoper: uName,
            joinClassID: jCID,
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            var flag = 1;
            wx.showToast({
              title: '提交成功',
              duration: 2000
            });
            if (flag == 1) {
              wx.navigateTo({
                url: '../through/through'
              })
            }
          }
        })

      }
    }
  },
  onChangeShowState: function() {
    var that = this;
    that.setData({
      showView: (!that.data.showView),
    })
  },

  /**
   * 查询
   */
  serach: function(e) {
    var serach = e.detail.value
    var that = this;
    wx.request({
      method: 'POST',
      url: host + "api/Activity?value=" + serach + "&mid=19",
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.length == 0) {
          that.wetoast.toast({
            title: '查询为空',
            duration: 1000,
          })
          that.setData({
            listW: res.data,
          })
        } else {
          that.setData({
            listW: res.data
          })
        }
      }
    })
  },

  /**
   * 刷新
   */
  refresh: function() {
    var that = this;
    wx.request({
      url: host + 'api/Activity/',
      data: {
        s: 'wxy'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          listW: res.data,
          other: [],
        })
       
      }
    })
  },

})