// pages/login/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  bindGetUserInfo: function(res) {
    //允许授权
    if (res.detail.userInfo) {
      //获取用户信息
      wx.getUserInfo({
        success: function(res) {
          //登录
          var encryptedData = res.encryptedData;
          var iv = res.iv;
          wx.login({
            success: function(res) {
              //如果有code
              if (res.code) {
                //请求接口
                wx.request({
                  url:'https://liuchuanqi.com/api/auth/login',
                  method: 'post',
                  data: {
                    code: res.code,
                    iv:iv,
                    encryptedData: encryptedData
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
                    //跳转到首页
                    wx.redirectTo({
                      url: '/pages/index/index',
                    });
                  }
                });
              }
            }
          });
        }
      })
    } else {
      //拒绝授权
      console.log('拒绝授权');
      wx.showModal({
        title:'警告',
        content:'您点击了拒绝授权，将无法使用刷题和个人中心功能',
        showCancel:false,
        confirmText:'返回授权',
        success:function(res) {
          if(res.confirm) {
            //返回授权
            console.log('拒绝授权-返回授权');
          } else {
            //拒绝授权
            console.log('拒绝授权-拒绝授权');
          }
        }
      })
    }
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