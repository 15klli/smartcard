// pickCardLog.js
var Zan = require('../../css/index')

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();

var now = year + '-' + month + '-' + day;
var start = year + '-' + (month - 1) + '-' + day;
var app = getApp();

Page(Object.assign({}, Zan.TopTips, {

  /**
   * 页面的初始数据
   */
  data: {
    startDay: start,
    pickDate: now,
    endDay: now,
    collegePicker: {
      college: ['学院', '工学院', '理学院', '文学院', '商学院',
        '法学院', '医学院', '新闻学院', '艺术学院', '教职工'
      ],
      iniVal: 0,
    },

    placePicker: {
      place: ['请选择', '图书馆', 'AB社区', 'CD社区', 'EF社区', '研究生宿舍区',
        'G座宿舍', '留学生宿舍', '至诚书院', '弘毅书院', '知行书院', '思源书院'
      ],
      iniVal: 0,
    },
    placeChoice: 0,
    collegeChoice: 0,
    cardPlace: '',
    way: 1, //作为哪种方式

    lostCardInfo: {
      name: '',
      num: '',
      stuNum: '',
      college: ''
    },
    pickerInfo: {
      name: '',
      phone: '',
    },
  },



  radioChange: function(e) {
    
    this.setData({
      way: e.detail.value
    });
  },

  onAreaChange: function(e) {
    this.setData({
      collegeChoice: e.detail.value
    })
  },

  onPlaceChange: function(e) {
    this.setData({
      placeChoice: e.detail.value
    })
    // this.data.flag=1;
  },

  startDateChange: function(e) {
    // console.log(e.detail);
    this.setData({
      pickDate: e.detail.value
    });
  },
  //检测用户输入是否规范

  submit: function(e) {
    let value = e.detail.value;
    let checkStuN = /^[0-9]{5,10}$/;
    let checkCardN = /^0[0-9]{5}$/;
    let checkPhoneNum = /^[186][0-9]{4,10}$/

    if (value.cardName.length == 0) {
      this.showZanTopTips('请输入卡主姓名');
      return;
      //todo:add auto-focus
    }
    this.data.lostCardInfo.name = value.cardName;

    if (!checkCardN.test(value.cardNum)) {
      this.showZanTopTips('卡号输入有误');
      return;
    }
    this.data.lostCardInfo.num = value.cardNum;


    if (!checkStuN.test(value.stuNum)) {
      this.showZanTopTips('学号输入有误');
      return;
    }
    this.data.lostCardInfo.stuNum = value.stuNum;

    this.data.lostCardInfo.college = this.data.collegePicker.college[this.data.collegeChoice]
    if (this.data.way == 0) {
      this.data.cardPlace = this.data.placePicker.place[this.data.placeChoice]
      if (this.data.placeChoice == 0) {
        this.showZanTopTips('请选择放卡位置');
        return;
      }
    } else {
      if (value.pickerName.length == 0) {
        this.showZanTopTips('请输入您的昵称');
        return;
      }
      this.data.pickerInfo.name = value.pickerName

      if (!checkPhoneNum.test(value.pickerPhone)) {
        this.showZanTopTips('手机号输入有误');
        return;
      }
      this.data.pickerInfo.phone = value.pickerPhone;

    }
    // console.log(this.data)
    //send data to sever
    let sendData = {};
    var cardInfo = this.data.lostCardInfo;
    let picker = this.data.pickerInfo;
    sendData = {
      lostCardInfo: {
        'name': cardInfo['name'],
        'cardNum': cardInfo['num'],
        'stuNum': cardInfo['stuNum'],
      },
      pickerInfo: {
        'name': picker.name,
        'phone': picker.phone,
      },
      placeChoice: this.data.placeChoice,
      cardPlace: this.data.cardPlace,
      way: this.data.way, //作为哪种方式
      pickDate: this.data.pickDate,
    }
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/pickCardLog',
      method: 'POST',
      data: sendData,
      success: function(res) {
        // var backData=res.data;
        if (res.data['isExist'] == 0) {
          if (that.data.way == 0) {
            wx.showModal({
              title: '登记成功',
              icon:'success',
              content: '已通知失主，请尽快将所拾卡放置在指定的位置',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          } else {
            wx.showModal({
              title: '登记成功',
              icon:'success',              
              content: '已通知失主，请保持手机畅通',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          }
        } 
        else if(res.data['isExist']==1) {
          console.log('error');
          wx.showModal({
            title: '',
            icon: 'none',
            content: '拾卡信息已登记，请勿重复登记！',
            showCancel: false,
            success: function () {
              wx.redirectTo({
                url: '/pages/main/main',
              })
            },
          })
        }
        else {
          console.log('error');
          wx.showModal({
            title: '错误',
            icon: 'none',
            content: '服务器错误，请稍候再试',
            showCancel: false,
            success: function() {
              wx.redirectTo({
                url: '/pages/main/main',
              })
            },
          })
        }
      },
      fail: function() {

      }
    })
  }
}))