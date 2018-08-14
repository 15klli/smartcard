// paymentRecord.js
var date = new Date();
var year = date.getFullYear();
var foreYear = year;
var month = date.getMonth() + 1;
var foreMonth = month - 1;
if (foreMonth == 0) {
  foreMonth = 12;
  foreYear = year - 1;
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
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDay: start,
    endDay: now,
    begin: now,
    end: now,
    show:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(now)
    if(app.globalData.isLoginSys==true){
      this.setData({show:true});      
    }
    else{
      wx.showToast({
        title: '请先登录系统',
        icon:'none'                
      });
      setTimeout(function () {
        wx.redirectTo({
          url: '/pages/loginSys/loginSys?showLogin=login',
        })},1500)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {    
    this.setData({ show: app.globalData.isLoginSys });    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  startDateChange: function (e) {
    // console.log(e.detail);
    this.setData({ begin: e.detail.value });
  },

  endDateChange: function (e) {
    // console.log(e.detail);    
    this.setData({ end: e.detail.value });
  },

  submit:function(){
    // console.log(this.data.begin+'\t'+this.data.end)
    var that=this;
    // sendData={
    //   'begin':begin,
    //   'end':end,
    // }

    wx.redirectTo({      
      url: '../paymentResult/paymentResult?begin='+that.data.begin+'&end='+that.data.end,    
    })
  }
})