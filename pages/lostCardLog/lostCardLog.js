// lostCardLog.js
var app=getApp();
var date = new Date();
var year = date.getFullYear();
var foreYear=year;
var month = date.getMonth() + 1;
var foreMonth=month-1;
if(foreMonth==0){
  foreMonth=12;
  foreYear=year-1;
}
var day = date.getDate();
if (month < 10) {
  month = '0' + month;
}
if (foreMonth < 10) {
  foreMonth = '0' + foreMonth;
}
if (day < 10) {
  day = '0' + day
}
var now = year + '-' + month + '-' + day;
var start = foreYear + '-' + foreMonth + '-' + day;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starDay:start,
    endDay:now,
    begin:now,
    showSuccess:false,
  },
  
  onLoad:function(){       
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
  },
  startDateChange:function(){
    this.setData({ begin: e.detail.value });    
  },
  onSubmit:function(e){
    var that=this;
    var formId = e.detail.formId;
    var sendData = {
      openid: app.globalData.openid,
      formId:formId,
    };

    wx.request({
      url: app.globalData.baseUrl + '/lostCardLog',
      data: sendData,
      success: function (res) {
        var rs = res.data['isExist'];
        if (rs == 1) {
          app.globalData.lostReported = true;
          
          wx.showToast({
            title: '已登记',
            icon: 'success',
            // duration: 1000,
          });
          setTimeout(function () { that.setData({ showSuccess: true })},1000)
          // console.log(formId);
          // app.hasFit(formId);
        }
        else {
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
  }
})