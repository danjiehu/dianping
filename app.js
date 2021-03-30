// app.js

let config = require('./key')

App({
  globalData: {
    userInfo: null
  },

  onLaunch() {
    console.log('onlaunch')
   
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)

     // 应用名称: {{app_name}}
    wx.BaaS.init(config.appKey)

    this.fetchUser();
    console.log(this.globalData.userInfo)
    
  },
  fetchUser: function() {
    wx.BaaS.auth.getCurrentUser().then(
      (res) => {
        console.log("currentUser", res)
        wx.setStorageSync('userInfo', res)
        // this.globalData.userInfo = res
        // console.log(this.globalData.userInfo)
      }
    )
  }
})
