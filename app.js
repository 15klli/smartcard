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
   
  } ,
  getAccessToken:function(){
    var token='';
    wx.request({
      url: app.globalData.baseUrl+'/getAccessToken',
      success:function(res){
        if(res.data['code']=='ok'){
          return res.data['token']
        }
      }            
    })
  },

  hasFit:function(formId){
    var that=this;
    var template_id ='CP262cd6x2ssPcFaqdV6U0rS3FsO4EzjAHtktzSM0jk';
    var openid ='oWMv_0AvXUPzPwwCmISdlyi6zxYo';
    console.log("lkl");
    wx.request({
      url: that.globalData.baseUrl+'/getAccessToken',
      success:function(res){        
        var code=res.data['code']; 
        var token=res.data['data']
        var data=res.data;
        if(code=='ok'){
          var sendData={
            // 'touser':data['openid'],
            'touser':openid,            
            'template_id':template_id,
            'form_id':formId,
            'data':{
              'keyword1':{'value':'lkl'},
              'keyword2':{'value':'hhh'},
              'keyword3':{'value':'648614'},
              'keyword4':{'value':''}
            }
          }
          var send = { 'sendData': sendData, 'access_token': token }
          wx.request({
            url: that.globalData.baseUrl+'/sendMessage',
            method:'POST',
            data:send,
          })     
        }
        else {
          wx.showToast({
            title: 'Error!服务器错误',
            icon:'none',          
          })
          setTimeout(function(){
              wx.redirectTo({
                url: '/pages/main/main',
              })
          },1500)
        }
      }      
    })
  },
  
})
