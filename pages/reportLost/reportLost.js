// pages/reportJs.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    wx.showModal({
      title: '确定挂失？',
      content: '挂失后可携身份证、学生证等证件于工作时间至网络与信息中心取消挂失',
      showCancel: true,
      success:function(res){
        if(res.cancel){
          wx.navigateBack({
            delta:1,
          })
        }
        else{          
            wx.navigateTo({
              url: '/pages/loginSys/loginSys?showLogin=lost',
            })                    
        }
      }
    })
      //  if(res.confirm){
      //    wx.showModal({
      //      title: '挂失成功',
      //      content: '',
      //      showCancel: false,
      //      success: function (res) {
      //        if (res.confirm) {
      //          wx.navigateBack({
      //            delta:1
      //          })
      //        }
      //      }
      //    })
      //  }
      // }

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
    this.setData({show:app.globalData.isLoginSys});
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