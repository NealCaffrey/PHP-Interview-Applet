// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    total:0,
    list:[]
  },
  // 事件处理函数
  onLoad() {
    //分类列表
    wx.request({
      url: app.globalData.apiUrl + '/api/index/category',
      header:{
        'content-type':'application/json'
      },
      success: res => {
        if (res.data.status) {
          this.setData({
            total:res.data.total,
            list:res.data.list
          })
        }
      }
    });

    //如果没有登录
    if (!app.globalData.userInfo && false) {
      //但是用户已经授权
      wx.getSetting({
        success: function (res) {
          //不用弹窗，用拿到的code请求后台接口，获取用户信息
          if (res.authSetting['scope.userInfo']) {
            //登录
            wx.login({
              success: function(res) {
                console.log(res);
                if (res.code) {
                  wx.request({
                    url:'https://liuchuanqi.com/api/auth/login',
                    method: 'post',
                    data: {
                      code: res.code
                    },
                    header: {
                      'content-type':'application/json'
                    },
                    success: function (res) {
                      //登录成功
                      var result = res.data;
                      if (result.status && result.data.access_token) {
                        app.globalData.access_token = result.data.token_type + result.data.access_token
                        app.globalData.userInfo = result.data.user_info
                      }
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  }
})
