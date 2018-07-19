//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    nickname:'',
    gender:'',
    openid:''
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  onLoad: function(){
    var that = this;
    setTimeout(function () {  
      wx.login({
        success: function (res) {
          wx.request({
            url: 'https://klli852.top/wx/login',
            method: 'GET',
            data: { code: res.code },
            success: function (res) {
              // var that=this;
              console.log(res);
              that.setData({ openid: res.data['openid'] });
              app.globalData.openid = res.data['openid'];
              console.log("res:" + app.globalData.openid)
              // console.log("res:" + res.data['openid'])
              // 跳转至注册页面
              if (res.data['isRegisted'] == false) {
                wx.showModal({
                  title: '注册',
                  content: '您尚未注册，需要进行注册',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '/pages/register/register',
                      })
                    } else if (res.cancel) {
                      console.log('用户点击取消');
                    }
                  }
                })

              }
              else wx.redirectTo({
                url: '/pages/main/main',
              })
            },
            fail: function () {
              console.log("Failed");
            },
            complete: function () {
              console.log('code:' + res.code)
            }
          })
        },
        fail: function (res) {
          console.log(res.errMsg);
        },
        complete: function () {
        }
      })          
    }, 2000)
   
   
  },
  enterIn:function(){
    wx.redirectTo({
      url: '../main/main'
    })
  },
  register:function(){
    wx.redirectTo({
      url: '../register/register'
    })
  }
})
