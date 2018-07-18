//app.js
var secret ='f7609e65b985b6310e5f0c9dd7f289bc'
var appid ='wx78e80bffd8b46982'
App({
  data:{
    openid:'',
  },
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    //调用微信登录接口
    wx.login({
      
      success: function (loginCode) {        

        //调用request请求api转换登录凭证
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=‘+<code></code>appid+’&secret=‘+secret+’&grant_type=authorization_code&js_code=' + loginCode.code,
        //   header: {
        //     'content-type': 'application/json'
        //   },
        //   success: function (res) {
        //     console.log(res.data.openid) //获取openid
        //     that.data.openid=res.data.openid
        //   }
        // })
        wx.request({
          url: 'https://www.klli852.top/wx',
          method:'GET',
          data:loginCode.code
        })
      }
    })
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
