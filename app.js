// app.js

let config = require('./key')

App({
  globalData: {
    userInfo: null,
    lat: null,
    long: null,
  },

  onLaunch() {
    console.log('onlaunch')
   
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)
     // 应用名称: {{app_name}}
    wx.BaaS.init(config.appKey)

    ///get user info, reset storage, save to app data
    this.fetchUser();
   
    //get user location, save to app data (should i save to storage?)
    this.fetchLocation();
  },

  //define fetchLocation function
  fetchLocation: function() {
    let page = this
    wx.getLocation({
      type: 'gcj-02',
      success: function(res) {
        console.log("applocation",res)
        page.globalData.lat = res.latitude
        page.globalData.long = res.longitude
      }
    })
  },

  //fetchUser from iFanr
  //onc get res, reset storage to new res
  fetchUser: function() {
    // let page = this
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
