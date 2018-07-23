// lostCardLog.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  
  onLoad:function(){    
    var sendData ={
      openid: app.globalData.openid
    } ;

    wx.request({
      url: app.globalData.baseUrl+'/lostCardLog',
      data: sendData,
      success:function(res){
        var rs=res.data['isExist'];
        if(rs==1){
          app.globalData.lostReported=true;
          wx.showToast({
            title: '已登记',
            icon:'success',
            duration:1000,
          })
        }
        else{
          wx.showToast({
            title: 'ERROR!服务器错误',
            icon: 'none',
            duration: 1000,
          });
          wx.navigateBack({
            url: '../main/main',
          })
        }
      }
    })
  } ,
  
  backToMain:function(){
    wx.showModal({
      title: '确定？',
      content: '返回主界面后可在 个人中心 里进行挂失',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  
  lostConfirm:function(){    
    wx.redirectTo({
      url: '../reportLost/reportLost',
    })
    // wx.showModal({
    //   title: '确定挂失？',
    //   content: '挂失后可携身份证、学生证等证件于工作时间至网络与信息中心取消挂失',
    //   showCancel: true,
    //   success:function(res){
    //    if(res.confirm){
    //      wx.showModal({
    //        title: '挂失成功',
    //        content: '',
    //        showCancel: false,
    //        success: function (res) {
    //          if (res.confirm) {
    //            wx.navigateBack({
    //              delta:1
    //            })
    //          }
    //        }
    //      })
    //    }
    //   }
      
    // })
  }
})