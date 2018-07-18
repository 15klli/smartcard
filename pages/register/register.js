// pages/register/register.js
var Zan = require('../../css/index')

Page(Object.assign( {},Zan.TopTips,{
  /**
   * 页面的初始数据
   */
  data: {
  name:'',
  stuNum:'',
  email:'',
  cardNum:'',
  cardPass:'',
  },

  /*填写完毕 */
  submit: function(e){
    // console.log("in")
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
    this.data.cerdPass = value.cerdPass;
    console.log("success");
  }
}))