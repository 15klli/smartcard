// main.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that= this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({ userInfo: res.userInfo })        
      },
      complete: function (res) {
        console.log("finish");
      }
    })  
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
  
  },
  toPickCardLog:function(){
    /*检测是否注册 */
    wx.navigateTo({
      url: '../pickCardLog/pickCardLog',
    })
  },

  toLostCardLog: function(){
    wx.navigateTo({
      url: '../lostCardLog/lostCardLog',
    })
  },

  toPersonality: function(){
    wx.navigateTo({
      url: '../personal/personal',
    })
  }
})