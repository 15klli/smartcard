// pages/register/register.js
var Zan = require('../../css/index')
var app = getApp()
Page(
  Object.assign( {},Zan.TopTips,{
  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    stuNum:'',
    email:'',
    cardNum:'',
    cardPaw:'',
    
  },
  
  
  /*填写完毕 */
  submit: function(e){
    // console.log("in")
    var info={}
    let value = e.detail.value;
    let checkCode=value.checkNum.length;
    if(checkCode==0){
      wx.showToast({
        title: '请输入验证码',
        image: '/images/ing.png'
      });
      return;
    }
    let checkStuN = /^[0-9]{5,10}$/;
    let checkCardN = /^0[0-9]{5}$/;
    let checkEmail = /^[0-9]{2}[a-z]*[0-9]?$/;
    let flag=true;

    //测试姓名（随意）
    if(value.name.length==0){
      // wx.showToast({
      //   title: '请输入姓名',
      //   image: '/images/ing.png'
      // });
      this.showZanTopTips('请输入姓名');
      return;
    }
    this.data.stuNum=value.stuNum;
    //测试学号
    flag = checkStuN.test(value.stuNum);
    if(!flag){
      this.setData({stuNum:''}) 
      // wx.showToast({
      //   title: '学号输入有误',
      //   image: '/images/ing.png'
      // });
      this.showZanTopTips('学号输入有误');
      return;
    }
    
    //测试邮箱号
    this.data.email = value.email;
    flag = checkEmail.test(value.email);
    if (!flag) {
      this.setData({ email: '' })
      // wx.showToast({
      //   title: '邮箱输入有误',
      //   image: '/images/ing.png'
      // });
      this.showZanTopTips('邮箱输入有误');      
      return;
    }
    //测试一卡通号
    this.data.cardNum = value.cardNum;
    flag = checkCardN.test(value.cardNum);
    if (!flag) {
      this.setData({ carNum: '' })
      // wx.showToast({
      //   title: '一卡通号输入有误',
      //   image: '/images/ing.png'
      // });
      this.showZanTopTips('一卡通号输入有误');      
      return;
    }
    this.data.name = value.name;
    this.data.cardPaw = value.cardPass;
    // console.log("success");
    info={
      'name':value.name,
      'stuNum':value.stuNum,
      'email': value.email,
      'cardNum': value.cardNum,
      'cardPaw': value.cardPass,
      'openid': app.globalData.openid,
    } 
    console.log("app:"+app.globalData.openid)
    wx.request({
      url: app.globalData.baseUrl+'/regist',
      data:info,
      method:'POST',
      success:function(res){
        if(res.data['isSuccess']==true){
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            success: function () {
              wx.redirectTo({
                url: '/pages/main/main',
              })
            }
          })
        }
        else{
          wx.showToast({
            title: 'Error！服务器出现错误，请稍候注册',
            icon: 'fail',
          })
        }
        
      },
      fail:function(){
        wx.showToast({
          title: 'Error！服务器出现错误，请稍候注册',
          icon: 'fail',
        })
        
      }
    })
  }
}))