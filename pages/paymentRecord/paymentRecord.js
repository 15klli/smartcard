// paymentRecord.js
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();

var now = year + '-' + month + '-' + day;
var start = year + '-' + (month - 1) + '-' + day;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDay: start,
    endDay: now,
    begin: now,
    end: now,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(now)
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
    wx.redirectTo({
      url: '../paymentResult/paymentResult',
    })
  }
})