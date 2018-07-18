// lostCardLog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

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
    wx.showModal({
      title: '确定挂失？',
      content: '挂失后可携身份证、学生证等证件于工作时间至网络与信息中心取消挂失',
      showCancel: true,
      success:function(res){
       if(res.confirm){
         wx.showModal({
           title: '挂失成功',
           content: '',
           showCancel: false,
           success: function (res) {
             if (res.confirm) {
               wx.redirectTo({
                 url: '../main/main',
               })
             }
           }
         })
       }
      }
      
    })
  }
})