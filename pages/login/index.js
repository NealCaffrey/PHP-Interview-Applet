// pages/login/index.js
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
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          //已经授权
        } else {
          //没有授权
        }
      }
    })
  },

  bindGetUserInfo: function(res) {
    if (res.detail.userInfo) {
      //允许授权
      var that = this;
      that.setData({
        isHide:false
      })
    } else {
      //拒绝授权
      wx.showModal({
        title:'警告',
        content:'您点击了拒绝授权，将无法使用刷题和个人中心功能',
        showCancel:false,
        confirmText:'返回授权',
        success:function(res) {
          if(res.confirm) {
            //返回授权
          } else {
            //拒绝授权
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