// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    total:0,
    list:[
      {"id":1,"name":"PHP基础","images":"/images/category/php.png"},
      {"id":2,"name":"PHP高级","images":"/images/category/php.png"},
      {"id":3,"name":"Mysql","images":"/images/category/mysql.png"},
      {"id":4,"name":"Linux","images":"/images/category/linux.png"},
      {"id":5,"name":"Nginx","images":"/images/category/nginx.png"},
      {"id":6,"name":"Redis","images":"/images/category/redis.png"},
      {"id":7,"name":"MongoDb","images":"/images/category/mongodb.png"},
      {"id":8,"name":"Kafka","images":"/images/category/kafka.png"},
      {"id":9,"name":"Docker","images":"/images/category/docker.png"},
      {"id":10,"name":"Vue","images":"/images/category/vue.png"},
    ]
  },
  // 事件处理函数
  onLoad() {
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
