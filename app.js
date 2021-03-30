// app.js
App({
  globalData: {
    userInfo: null
  },

  onLaunch() {
    console.log('onlaunch')
   
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)

    let clientID = '4095e1de147e136c208a'  // 应用名称: {{app_name}}
    wx.BaaS.init(clientID)

    this.fetchUser();
    console.log(this.globalData.userInfo)
    
  },
  fetchUser: function() {
    wx.BaaS.auth.getCurrentUser().then(
      (res) => {
        console.log("currentUser", res)
        wx.setStorageSync('userInfo', res)
        this.globalData.userInfo = res
        // console.log(this.globalData.userInfo)
      }
    )
  }
})
