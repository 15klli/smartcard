// paymentResult.js

var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {   
    // data for test
    // dateArray:['1','2'],
    // recordsArray: [[{ 'time': '-4', 'place': '-5', 'money': '-4' }, { 'time': '-4', 'place': '-5', 'money': '-4' }],['-4']],  
    dataArray:[],
    recordArray:[]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var begin=options.begin;
    var end=options.end;
    var sendData={
      'begin':begin,
      'end':end,
      'openid':app.globalData.openid,
    };
    var that=this;
    // console.log(sendData)
    wx.showLoading({
      title: '获取中...',
    });
    wx.request({
      url: app.globalData.baseUrl+'/getRecord',
      data:sendData,
      dataType:'json',
      method:'POST',
      success:function(res){
        console.log(res.data)
        that.setData({ dateArray: res.data['date'] })
        that.setData({recordsArray:res.data['records']});
      }
    });
    setTimeout(function () { wx.hideLoading()} , 2000)
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})