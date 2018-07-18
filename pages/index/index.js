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
    var that = this
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://klli852.top/wx/getOpenId',
          method: 'GET',
          data: {code:res.code},
          success: function (res) {
            console.log(res);
          },
          fail:function(){
            console.log("Failed");
          },
          complete: function () {
            // console.log("yes2")
            console.log('code:'+res.code)
            
          }
        })
      },
      fail:function(res){
        console.log(res.errMsg);
      },
      complete:function(){
        console.log("hhhhhh")
      }
    })
    // wx.getUserInfo({
    //   success: function(res) {
    //     that.setData({ userInfo :res.userInfo})
    //   },      
    //   complete: function (res) {
    //     console.log("finish");
    //     console.log(that.data.userInfo);
    //     wx.request({
    //       url: 'https://www.klli.top:80/wx',
    //       data: that.data.userInfo,
    //       method:'GET'
    //     })
    //   }
    // })
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
