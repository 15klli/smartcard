//app.js
var secret = 'f7609e65b985b6310e5f0c9dd7f289bc'
var appid = 'wx78e80bffd8b46982'
App({
  data: {},
  globalData: {
    userInfo: null,
    openid: '',
    baseUrl: 'https://klli852.top/wx',
    lostReported: false,
    // isLoginSys: true,
    isLoginSys:false,
  },
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getOpenid: function() {
    var that=this;
    wx.login({
      success: function(res) {
        wx.request({
          url: 'https://klli852.top/wx/login',
          method: 'GET',
          data: {
            code: res.code
          },
          success: function(res) {            
            
            that.globalData.openid = res.data['openid'];           
          }
        })
      }
    });   
   
  }  
})
