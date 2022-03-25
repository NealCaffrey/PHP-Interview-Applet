// app.js
App({
  onLaunch() {
  },
  globalData: {
    userInfo: null,
    access_token: null,
    apiUrl: 'https://liuchuanqi.com'
  },
  //引入towxml
  towxml:require('/towxml/index'),
  //登录
  checkLogin: function () {
    console.log(this.globalData.userInfo);
    if (!this.globalData.userInfo) {
      wx.redirectTo({
        url:"/pages/login/index"
      });
      return false;
    } else {
      return true;
    }
  }
})
