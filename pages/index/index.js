// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    total:0,
    list:[],
    knowledge:[]
  },
  // 事件处理函数
  onLoad() {
    wx.request({
      url: 'https://liuchuanqi.com/api/index/category',
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
    })
  },
  //点击分类
  showItem:function (event) {
    //当前点击的分类ID
    let categoryId = event.currentTarget.dataset.id;
    //判断分类状态
    var data = this.data.list;
    for (var i=0; i<data.length;i++) {
      if (data[i].id == categoryId) {
        data[i].show = data[i].show ? false : true;
      } else {
        data[i].show = false;
      }
    }
    this.setData({
      list:data
    });
    wx.request({
      url: 'https://liuchuanqi.com/api/index/knowledge/'+categoryId,
      header:{
        'content-type':'application/json'
      },
      success: res => {
        if (res.data.status) {
          this.setData({
            knowledge:res.data.list
          })
        }
      }
    })
  }
})
