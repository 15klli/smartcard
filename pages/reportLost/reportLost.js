// pages/reportLost.js
var app=getApp();
var Zan = require('../../css/index')

Page(
  Object.assign({}, Zan.TopTips,{

  /**
   * 页面的初始数据
   */
  data: {
    hasCardPaw:false,  
    // src: app.globalData.baseUrl + '/getPic?' +Math.random()*1000,  
    src:'',
    cardPaw: '905409',
    // cardPaw:'',
    vcode:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that=this;
    // var hasCardPaw =that.data['hasCardPaw']
    // console.log(app.globalData.openid)
    // var openid = app.globalData.openid;
    var sendData={
      openid:app.globalData.openid
    }   
    wx.request({
      url: app.globalData.baseUrl+'/hasCardPaw',
      data:sendData,
      method:'GET',
      success:function(res){        
        that.setData({ hasCardPaw: res.data['hasCardPaw']});
      }
    });
    // wx.request({
    //   url: app.globalData.baseUrl+'/loginSys',
    //   success:function(res){  //return img.src
    //     that.setData({src:app.globalData.baseUrl+res.data['imgSrc']})
    //   }
    // })
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
    this.setData({ src: app.globalData.baseUrl + '/getPic?' + Math.random() * 1000 })
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


  submit:function(e){
    var that=this;
    // this.data.zanTopTips['timer'] = 0;
    let value = e.detail.value;
    let vcode=value.vcode;
    let cardPaw=value.cardPaw;    
    if (vcode.length != 4){
      this.showZanTopTips('请填写完整验证码');
      // this.setData({ src: '' })      
      return;
    }
    if (cardPaw==''){
      this.showZanTopTips('请输入一卡通密码');
      return;
    }
    let sendData={
      vcode:vcode,
      cardPaw:cardPaw,
      openid:app.globalData.openid
    }
    wx.request({
      url: app.globalData.baseUrl+'/loginSys',
      data:sendData,
      method:'POST',
      dataType:'json',
      success:function(res){
        // console.log('isSuccess' + res.data);        
        let isSuccess=res.data['isSuccess'];        
        if(isSuccess){
          wx.showToast({
            title: '挂失成功',
            icon: 'success',                      
          });
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          }, 1600)
        }        
        else {
          that.showZanTopTips('验证码或者密码错误！请重新输入');
          // var Code=that.data.vcode;     
          console.log(that.data);
          that.setData({ vcode: '', src: app.globalData.baseUrl + '/getPic?' + Math.random() * 1000,cardPaw:''}); 
        }
      }
    })
  }
}))