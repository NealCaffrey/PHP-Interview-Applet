// pages/question/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    content:'',
    info:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //验证是否已经登录
    var app = getApp();
    if (app.checkLogin()) {
      //获取信息
      var that = this;
      that.setData({
        id:options.id
      });
      wx.request({
        url: app.globalData.apiUrl + '/api/user/knowledgeInfo/'+options.id,
        header:{
          'content-type':'application/json',
          'Authorization':app.globalData.access_token
        },
        success: res => {
          if (res.data.status) {
            let result = app.towxml(res.data.data.answer, 'markdown');
            that.setData({
              info:res.data.data,
              content:result
            })
          }
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  //切换
  switchKnow(event) {
    let id = event.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + '/api/index/knowledgeInfo/'+id,
      header:{
        'content-type':'application/json'
      },
      success: res => {
        if (res.data.status) {
          let result = app.towxml(res.data.data.answer, 'markdown');
          that.setData({
            info:res.data.data,
            content:result
          })
        }
      }
    })
  }
})