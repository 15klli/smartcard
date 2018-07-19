//app.js
var secret ='f7609e65b985b6310e5f0c9dd7f289bc'
var appid ='wx78e80bffd8b46982'
App({
  data:{   
  },
  globalData: {
    userInfo: null,
    openid: '',
    baseUrl: 'https://klli852.top/wx',
  },
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    
    // wx.login({
    //   success: function (res) {
    //     wx.request({
    //       url: 'https://klli852.top/wx/login',
    //       method: 'GET',
    //       data: { code: res.code },
    //       success: function (res) {
    //         // var that=this;
    //         console.log(res);
    //         // that.setData({ openid: res.data['openid'] });
    //         that.globalData.openid = res.data['openid'];
    //         console.log("res:" + that.globalData.openid)
    //         // console.log("res:" + res.data['openid'])
    //         // 跳转至注册页面
    //         if (res.data['isRegisted'] == false) {
    //           wx.showModal({
    //             title: '注册',
    //             content: '您尚未注册，需要进行注册',
    //             success: function (res) {
    //               if (res.confirm) {
    //                 wx.navigateTo({
    //                   url: '/pages/register/register',
    //                 })
    //               } else if (res.cancel) {
    //                 console.log('用户点击取消');
    //                 wx.redirectTo({
    //                   url: '/pages/main/main',
    //                 })
    //               }
    //             }
    //           })

    //         }
    //         else wx.redirectTo({
    //           url: '/pages/main/main',
    //         })
    //       },
    //       fail: function () {
    //         console.log("Failed");
    //       },
    //       complete: function () {
    //         console.log('code:' + res.code)
    //       }
    //     })
    //   },
    //   fail: function (res) {
    //     console.log(res.errMsg);
    //   },
    //   complete: function () {
        
    //   }
    // })
   
  },
  

 
})
