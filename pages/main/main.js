// main.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    cardStatus:'我丢卡了',
    btnClass:'zan-btn zan-btn--warn',
    isDisable: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that= this;    
    var sendData={
      openid:app.globalData.openid
    } ;
    wx.request({
      url: app.globalData.baseUrl + '/lostCardLog',
      data: sendData,
      success: function (res) {
        var rs = res.data['isExist'];
      console.log('rs'+rs);
        var status = that.data.cardStatus;
        let btn=that.data.btnClass;
        let isDisable = that.data.isDisable;
        if (rs == 1) {
          that.setData({cardStatus:'已进行失卡登记'});                  
          that.setData({ btnClass:'zan-btn zan-btn--disabled'});
          that.setData({isDisable:'true'}) ;
          app.globalData.lostReported=true;
        }        
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
    var i=1;  
    var that=this;
    if (app.globalData.lostReported == true){
      that.setData({ cardStatus: '已进行失卡登记' });
      that.setData({ btnClass: 'zan-btn zan-btn--disabled' });
      that.setData({ isDisable: 'true' });      
    }
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